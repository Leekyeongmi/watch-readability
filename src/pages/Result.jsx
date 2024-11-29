import { Text } from '../components/atoms/Text';
import { CenterColumn, CenterRow, Column } from '../components/layouts/Layout';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { useState } from 'react';
import { useEffect } from 'react';

import { generateRandomTime } from '../utils/generateRandomTime';
import StaticClock from '../components/StaticClock';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useUserTheme } from '../stores/useTheme';
import styled from 'styled-components';
import { LAYOUT } from '../constant';
import { Row } from '../components/layouts/Layout';

function Result() {
  const [stats, setStats] = useState();
  const userTheme = useUserTheme();
  const [updateTime, setUpdateTime] = useState(null);
  const [rotation, setRotation] = useState({
    hourRotation: 0,
    minuteRotation: 0,
    secondRotation: 0
  });

  async function calculateStats(theme) {
    const q = query(
      collection(firestore, 'problems'),
      where('theme', '==', theme)
    );

    const querySnapshot = await getDocs(q);

    const clockStats = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const clockId = data.clockId;

      if (!clockStats[clockId]) {
        clockStats[clockId] = {
          totalElapsedTime: 0,
          totalHourErrorAngle: 0,
          totalMinuteErrorAngle: 0,
          totalSecondErrorAngle: 0,
          userCount: 0
        };
      }

      clockStats[clockId].totalElapsedTime += data.elapsedTime;
      clockStats[clockId].totalHourErrorAngle += data.hourErrorAngle || 0;
      clockStats[clockId].totalMinuteErrorAngle += data.minuteErrorAngle || 0;
      clockStats[clockId].totalSecondErrorAngle += data.secondErrorAngle || 0;
      clockStats[clockId].userCount += 1;
    });

    const result = Object.entries(clockStats)
      .map(([clockId, stats]) => ({
        clockId: parseInt(clockId),
        averageElapsedTime:
          Math.floor((stats.totalElapsedTime / stats.userCount) * 100) / 100,
        averageHourError:
          Math.floor((stats.totalHourErrorAngle / stats.userCount) * 100) / 100,
        averageMinuteError:
          Math.floor((stats.totalMinuteErrorAngle / stats.userCount) * 100) /
          100,
        averageSecondError:
          Math.floor((stats.totalSecondErrorAngle / stats.userCount) * 100) /
          100,
        userCount: stats.userCount
      }))
      .sort((a, b) => a.averageElapsedTime - b.averageElapsedTime);

    setStats(result);
    setUpdateTime(new Date());
  }

  useEffect(() => {
    calculateStats(userTheme);
  }, [userTheme]);

  useEffect(() => {
    const randomTime = generateRandomTime();
    setRotation(randomTime);
  }, []);

  return (
    <ResultPage>
      <ContentSection>
        <ThemeSwitcher />
        <Text typo='head01'>{`테스트 페이지 - ${userTheme} 통계 (순위 결정 계산식 수정 필요)`}</Text>
        {updateTime && (
          <Text typo='body03M'>{`데이터 업데이트 시간: ${updateTime.toLocaleString()}`}</Text>
        )}

        {stats?.map((item, index) => {
          return (
            <Item key={index}>
              <CenterRow gap='2rem'>
                <Text typo='head01'>{`${index}`}</Text>
                <StaticClock type={item?.clockId} rotation={rotation} />
              </CenterRow>
              <CenterColumn>
                <Text typo='body03M'>{`평균 소요시간 🎈${item?.averageElapsedTime}초`}</Text>
                <Text typo='body03M'>{`평균 시침 오차 각도 🎈${item?.averageHourError}°`}</Text>
                <Text typo='body03M'>{`평균 분침 오차 각도 🎈${item?.averageMinuteError}°`}</Text>
                <Text typo='body03M'>{`평균 초침 오차 각도 🎈${item?.averageSecondError}°`}</Text>
                <Text typo='body03M'>{`참여 유저수 🎈${item?.userCount}명`}</Text>
              </CenterColumn>
            </Item>
          );
        })}
      </ContentSection>
    </ResultPage>
  );
}

export default Result;

const ResultPage = styled(Column)`
  height: 100%;
  // padding: ${LAYOUT.PADDING_X}rem;
`;

const ContentSection = styled(Column)`
  height: 100%;

  padding: ${LAYOUT.PADDING_X}rem;
`;

const Item = styled(CenterRow)`
  justify-content: space-around;
`;
