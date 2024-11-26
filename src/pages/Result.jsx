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
          totalErrorMargin: 0,
          userCount: 0
        };
      }

      clockStats[clockId].totalElapsedTime += data.elapsedTime;
      clockStats[clockId].totalErrorMargin += data.errorMargin;
      clockStats[clockId].userCount += 1;
    });

    const result = Object.entries(clockStats)
      .map(([clockId, stats]) => ({
        clockId: parseInt(clockId),
        averageElapsedTime: stats.totalElapsedTime / stats.userCount,
        averageErrorMargin: stats.totalErrorMargin / stats.userCount,
        userCount: stats.userCount
      }))
      .sort((a, b) => a.averageElapsedTime - b.averageElapsedTime);

    setStats(result);
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
        <Text typo='head01'>{`테스트 페이지 - ${userTheme} 통계`}</Text>
        {stats?.map((item, index) => {
          return (
            <Item key={index}>
              <CenterRow gap='2rem'>
                <Text typo='head01'>{`${index}`}</Text>
                <StaticClock type={item?.clockId} rotation={rotation} />
              </CenterRow>
              <CenterColumn>
                <Text typo='body03M'>{`평균 소요시간 🎈${item?.averageElapsedTime}초`}</Text>
                <Text typo='body03M'>{`평균 오차 절대값 🎈${item?.averageErrorMargin}초`}</Text>
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
