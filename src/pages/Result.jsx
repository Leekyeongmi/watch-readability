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
          errorScore: Math.floor(errorScore * 1000) / 10,
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
              >{`빠른 가독성`}</Text>
              <Text
                style={{
                  textDecoration: filter === 0 ? 'underline' : 'none'
                }}
                typo='head4'
                color={filter === 0 ? 'primary500' : 'font'}
              >{`(소요 시간 빠른 순)`}</Text>
            </FilterItem>
            <FilterItem isSelected={filter === 1} onClick={() => setFilter(1)}>
              <Text
                style={{
                  textDecoration: filter === 1 ? 'underline' : 'none'
                }}
                typo='head5'
                color={filter === 1 ? 'primary500' : 'font'}
              >{`정확한 판독성`}</Text>
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
            onClick={() => setIsModalOpen(true)}
            width={'4.68rem'}
            height={'1.5rem'}
            size={'s'}
            shape={'round'}
            textProps={{ text: '나의 결과', typo: 'head4' }}
            bg='white'
          />
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
            <Text typo='body03M'>{`데이터 업데이트 시간: ${updateTime ? updateTime.toLocaleString() : '-'}`}</Text>
            <Text typo='body03M'>{`현재까지 참여자들이 총 ${totalUserCount}개의 문제를 풀었습니다.`}</Text>
          </DateContainer>
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
  gap: 5rem;
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

const DateContainer = styled(CenterColumn)``;
