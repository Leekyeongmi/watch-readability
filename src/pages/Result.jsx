import { Text } from '../components/atoms/Text';
import {
  CenterColumn,
  CenterRow,
  Column,
  Row
} from '../components/layouts/Layout';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { LAYOUT } from '../constant';
import HeaderSection from '../components/atoms/HeaderSection';
import BasicButton from '../components/atoms/BasicButton';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../components/components/HomeButton';
import MovingClock from '../components/MovingClock';
import UserDataModal from '../components/components/UserDataModal';

function Result() {
  const [stats, setStats] = useState();
  const [updateTime, setUpdateTime] = useState(null);
  const [filter, setFilter] = useState(0);
  const navigate = useNavigate();
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function calculateStats(filter) {
    const q = query(collection(firestore, 'problems'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert(
        '벌써 무료 계정 한도에 도달했네요! 내일 다시 찾아주시길 부탁드려요. 개발자 휴가가 끝나면 통계 로직 재정비 하겠습니다.🌴'
      );
      throw new Error('No data found in the "problems" collection.');
    }

    const clockStats = {};
    let totalUserCount = 0;

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

      totalUserCount += 1;
    });

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

        const epsilon = 0.01;
        const adjustedLog = (value, maxValue) => {
          if (value === 0) {
            return 100;
          }

          const logValue = Math.log(value + epsilon);
          const logMaxValue = Math.log(maxValue + epsilon);
          const normalizedScore = Math.max(
            0,
            100 - (logValue / logMaxValue) * 100
          );

          return normalizedScore;
        };

        const calculateErrorScore = (
          averageHourError,
          averageMinuteError,
          averageSecondError
        ) => {
          const hourScore = adjustedLog(averageHourError, 90) * 0.6;
          const minuteScore = adjustedLog(averageMinuteError, 90) * 0.35;
          const secondScore = adjustedLog(averageSecondError, 120) * 0.05;

          return hourScore + minuteScore + secondScore;
        };

        const errorScore = calculateErrorScore(
          averageHourError,
          averageMinuteError,
          averageSecondError
        );

        return {
          clockId: parseInt(clockId),
          averageElapsedTime,
          averageHourError,
          averageMinuteError,
          averageSecondError,
          errorScore: errorScore.toFixed(2),
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
    setUpdateTime(new Date());
    setTotalUserCount(totalUserCount);
  }

  useEffect(() => {
    calculateStats(filter);
  }, [filter]);

  return (
    <ResultPage>
      <HeaderSection>
        <FilterSection>
          <FilterContainer>
            <FilterItem isSelected={filter === 0} onClick={() => setFilter(0)}>
              <Text
                style={{
                  textDecoration: filter === 0 ? 'underline' : 'none'
                }}
                typo='head5'
                color={filter === 0 ? 'primary500' : 'font'}
              >{`가독성`}</Text>
              <Text
                style={{
                  textDecoration: filter === 0 ? 'underline' : 'none'
                }}
                typo='head4'
                color={filter === 0 ? 'primary500' : 'font'}
              >{`(빠른순)`}</Text>
            </FilterItem>
            <FilterItem isSelected={filter === 1} onClick={() => setFilter(1)}>
              <Text
                style={{
                  textDecoration: filter === 1 ? 'underline' : 'none'
                }}
                typo='head5'
                color={filter === 1 ? 'primary500' : 'font'}
              >{`판독성`}</Text>
              <Text
                style={{
                  textDecoration: filter === 1 ? 'underline' : 'none'
                }}
                typo='head4'
                color={filter === 1 ? 'primary500' : 'font'}
              >{`(정확도순)`}</Text>
            </FilterItem>
          </FilterContainer>
        </FilterSection>
      </HeaderSection>
      <ScrollColumn>
        <NavSection>
          <BasicButton
            onClick={() => navigate('/quiz')}
            width={'4.68rem'}
            height={'1.5rem'}
            size={'s'}
            shape={'round'}
            textProps={{ text: 'retry', typo: 'head4' }}
            bg='white'
          />
          <HomeButton />
          <BasicButton
            onClick={() => setIsModalOpen(true)}
            width={'4.68rem'}
            height={'1.5rem'}
            size={'s'}
            shape={'round'}
            textProps={{ text: '내결과', typo: 'head4' }}
            bg='white'
          />
        </NavSection>
        <ContentSection>
          {stats?.map((item, index) => {
            return (
              <Item key={index}>
                <Rank>
                  <Text typo='head01'>{`${index + 1}`}</Text>
                </Rank>
                <ClockWrapper>
                  <MovingClock type={item?.clockId} rank={index + 1} />
                </ClockWrapper>
                <DataContainer gap='0.75rem'>
                  <Column>{filter === 1 && <></>}</Column>
                  <Column>
                    {filter === 0 && (
                      <Text typo='head4'>{`${item?.averageElapsedTime} sec`}</Text>
                    )}
                    {filter === 1 && (
                      <Text typo='head4'>{`${item?.errorScore} 점`}</Text>
                    )}
                  </Column>
                </DataContainer>
              </Item>
            );
          })}
          <DateContainer>
            <Text
              typo='head4'
              color='font'
            >{`updated at. ${updateTime ? updateTime.toLocaleString() : '-'}`}</Text>
            <Text
              typo='head4'
              color='font'
            >{`실험이 ${totalUserCount}개 진행되었습니다`}</Text>
          </DateContainer>

          <CopyRight>
            <Text typo='head4' color='font'>{`*
          판독성 점수는 사용자 입력 시각과 
          정답 시각의 평균 오차 각도를 기준으로 계산합니다
          **
          시, 분, 초침에는 각 60% 35% 5%의 
          가중치가 적용됩니다

          designer. Chung jinsung
          developer. Lee kyeongmi
          professor. Lee byounghak
          
          2024 - 2025
          Seoul national university of 
          science & technology
          M.F.A in visual design
          
          `}</Text>
          </CopyRight>
        </ContentSection>
      </ScrollColumn>
      {isModalOpen && (
        <UserDataModal onClose={() => setIsModalOpen(false)}></UserDataModal>
      )}
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
  width: 100%;
`;

const FilterContainer = styled(CenterRow)`
  width: 100%;
  justify-content: space-evenly;
`;

const NavSection = styled(Row)`
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
`;

const ContentSection = styled(Column)`
  gap: 1.375rem;
  padding: ${LAYOUT.PADDING_X}rem;
  padding-top: 2.5rem;
  justify-content: space-evenly;
`;

const ScrollColumn = styled(Column)`
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

const CopyRight = styled(CenterColumn)`
  gap: 0.25rem;
  text-align: center;
  margin-top: 3rem;
`;

const Item = styled(CenterRow)`
  width: 100%;
`;

const FilterItem = styled(Column)`
  gap: 0.5rem;
  cursor: pointer;
`;

const Rank = styled(CenterRow)`
  width: 6.5rem;
`;

const ClockWrapper = styled(CenterRow)`
  width: 16rem;
`;

const DataContainer = styled(CenterRow)`
  width: 6.5rem;
`;

const DateContainer = styled(CenterColumn)`
  margin-top: 2rem;
`;
