import { Text } from '../components/atoms/Text';
import { CenterColumn, CenterRow, Column } from '../components/layouts/Layout';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { generateRandomTime } from '../utils/generateRandomTime';
import StaticClock from '../components/StaticClock';
import styled from 'styled-components';
import { LAYOUT } from '../constant';
import HeaderSection from '../components/atoms/HeaderSection';
import BasicButton from '../components/atoms/BasicButton';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/components/HomeButton';

function Result() {
  const [stats, setStats] = useState();
  const [updateTime, setUpdateTime] = useState(null);
  const [filter, setFilter] = useState(0);
  const navigate = useNavigate();
  const [rotation, setRotation] = useState({
    hourRotation: 0,
    minuteRotation: 0,
    secondRotation: 0
  });

  async function calculateStats(filter) {
    const q = query(collection(firestore, 'problems'));
    const querySnapshot = await getDocs(q);

    const clockStats = {};
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const clockId = data.clockId;
      console.log(data, 'data=');

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
    console.log(clockStats);
    const result = Object.entries(clockStats)
      .map(([clockId, stats]) => {
        const averageElapsedTime =
          Math.floor((stats.totalElapsedTime / stats.userCount) * 100) / 100;
        const averageHourError =
          Math.floor((stats.totalHourErrorAngle / stats.userCount) * 100) / 100;
        const averageMinuteError =
          Math.floor((stats.totalMinuteErrorAngle / stats.userCount) * 100) /
          100;
        const averageSecondError =
          Math.floor((stats.totalSecondErrorAngle / stats.userCount) * 100) /
          100;

        const reciprocal = (value) => (value !== 0 ? 1 / value : 1);

        const errorScore =
          reciprocal(averageHourError) * 0.5 +
          reciprocal(averageMinuteError) * 0.35 +
          reciprocal(averageSecondError) * 0.15;

        return {
          clockId: parseInt(clockId),
          averageElapsedTime,
          averageHourError,
          averageMinuteError,
          averageSecondError,
          errorScore: Math.floor(errorScore * 100) / 100,
          userCount: stats.userCount
        };
      })

      .sort((a, b) => {
        if (filter === 1) {
          return b.errorScore - a.errorScore;
        } else if (filter === 0) {
          return a.averageElapsedTime - b.averageElapsedTime;
        }
      });

    setStats(result);
    console.log(result);
    setUpdateTime(new Date());
  }

  useEffect(() => {
    calculateStats(filter);
  }, [filter]);

  useEffect(() => {
    const randomTime = generateRandomTime();
    setRotation(randomTime);
  }, []);

  return (
    <ResultPage>
      <HeaderSection>
        <FilterSection>
          <Text typo='head04' color='font'>
            {`연구에 참여해주셔서 감사합니다 !`}
          </Text>
          <Column gap='0.5rem'>
            <ButtonContainer>
              <BasicButton
                onClick={() => setFilter(0)}
                width={'10rem'}
                height={'1.55rem'}
                size={'s'}
                textProps={{ text: '빠른 가독성' }}
                bg={filter === 0 ? 'white' : `${theme.colors.grey200}`}
              ></BasicButton>
              <BasicButton
                onClick={() => setFilter(1)}
                width={'10rem'}
                height={'1.55rem'}
                size={'s'}
                textProps={{ text: '정확한 판독성' }}
                bg={filter === 1 ? 'white' : `${theme.colors.grey200}`}
              ></BasicButton>
            </ButtonContainer>

            <Text typo='body03M'>{`데이터 업데이트 시간: ${updateTime ? updateTime.toLocaleString() : '-'}`}</Text>
          </Column>
        </FilterSection>
      </HeaderSection>
      <ContentSection>
        <ButtonContainer2>
          <HomeButton />
          <BasicButton
            onClick={() => navigate('/quiz')}
            width={'4.68rem'}
            height={'1.5rem'}
            size={'s'}
            shape={'round'}
            textProps={{ text: 'retry', typo: 'head4' }}
            bg='white'
          />
        </ButtonContainer2>

        {stats?.map((item, index) => {
          return (
            <Item key={index}>
              <CenterRow gap='0.5rem'>
                <Text typo='head01'>{`${index + 1}`}</Text>
                <StaticClock
                  type={item?.clockId}
                  rotation={rotation}
                  rank={index + 1}
                />
              </CenterRow>
              <CenterColumn>
                <Text typo='body03M'>{`평균 소요시간 🎈${item?.averageElapsedTime}sec`}</Text>
                <Text typo='body03M'>{`종합 시인성 점수 🎈${item?.errorScore}점`}</Text>
                {filter === 1 && (
                  <>
                    <Text typo='body03M'>{`- 평균 시침 오차 각도 🎈${item?.averageHourError}°`}</Text>
                    <Text typo='body03M'>{`- 평균 분침 오차 각도 🎈${item?.averageMinuteError}°`}</Text>
                    <Text typo='body03M'>{`- 평균 초침 오차 각도 🎈${item?.averageSecondError}°`}</Text>
                  </>
                )}
                <Text typo='body03M'>{`참여 유저수 🎈${item?.userCount}명`}</Text>
              </CenterColumn>
            </Item>
          );
        })}
        <CopyRight>
          <Text typo='body03M'>{`designer. Chung jinsung
          developer. Lee kyeongmi
          professor. Lee byounghak
          
          2024 
          Seoul national university of 
          science & technology
          M.F.A in visual design
          
          `}</Text>
        </CopyRight>
      </ContentSection>
    </ResultPage>
  );
}

export default Result;

const ResultPage = styled(Column)`
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(to bottom, #00ff00 15%, #f1f3f5 75%);
  background-repeat: no-repeat;
`;

const FilterSection = styled(CenterColumn)`
  gap: 1rem;
  padding: ${LAYOUT.PADDING_X}rem;
  box-sizing: border-box;
`;

const ButtonContainer = styled(CenterRow)`
  background-color: ${({ theme }) => theme.colors.grey200};
  border-radius: 0.5rem;
  padding: 0.2rem;
`;

const ButtonContainer2 = styled(CenterRow)`
  gap: 1rem;
  // width: 100%;
  box-sizing: border-box;
  align-self: flex-start;
`;

const ContentSection = styled(Column)`
  height: 100%;
  gap: 1.5rem;
  width: 100%;
  align-self: flex-start;

  padding: ${LAYOUT.PADDING_X}rem;
  box-sizing: border-box;
`;

const CopyRight = styled(CenterColumn)`
  gap: 0.25rem;
  text-align: center;
  margin-top: 3rem;
  // align-self: flex-start;
`;

const Item = styled(CenterRow)`
  // justify-content: space-around;
  gap: 1.5rem;
`;
