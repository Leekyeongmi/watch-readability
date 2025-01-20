import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CenterRow, Column } from '../layouts/Layout';
import { Text } from '../atoms/Text';
import { processUserData } from '../../utils/updateCookie';
import MovingClock from '../MovingClock';
import { LAYOUT } from '../../constant';

export default function UserDataModal({ onClose }) {
  const [filter, setFilter] = useState(0);
  const [stats, setStats] = useState();

  useEffect(() => {
    const fetchedData = processUserData();
    const sortedData =
      filter === 0
        ? fetchedData.sort(
            (a, b) => a.averageElapsedTime - b.averageElapsedTime
          )
        : fetchedData.sort((a, b) => b.errorScore - a.errorScore);

    setStats(sortedData);
  }, [filter]);

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <FilterContainer>
          <FilterItem isSelected={filter === 0} onClick={() => setFilter(0)}>
            <Text
              style={{
                textDecoration: filter === 0 ? 'underline' : 'none'
              }}
              typo='head5'
              color={filter === 0 ? 'primary500' : 'font'}
            >{`빠른 가독성`}</Text>
          </FilterItem>
          <FilterItem isSelected={filter === 1} onClick={() => setFilter(1)}>
            <Text
              style={{
                textDecoration: filter === 1 ? 'underline' : 'none'
              }}
              typo='head5'
              color={filter === 1 ? 'primary500' : 'font'}
            >{`정확한 판독성`}</Text>
          </FilterItem>
        </FilterContainer>
        <ContentSection>
          {stats?.slice(0, 3).map((item, index) => {
            console.log(item);
            return (
              <Item key={index}>
                <Rank>
                  <Text typo='head01'>{`${index + 1}`}</Text>
                </Rank>
                <ClockWrapper>
                  <MovingClock type={item?.clockId} rank={index + 1} />
                </ClockWrapper>
                <DataContainer gap='0.75rem'>
                  <Column>
                    {filter === 0 && (
                      <Text typo='head4'>{`${item?.averageElapsedTime} sec`}</Text>
                    )}
                    {filter === 1 && (
                      <>
                        <Text typo='head3'>{`${item?.errorScore} 점`}</Text>
                        <Text typo='head4'>{`시침오류 : \n ${item?.averageHourError}°`}</Text>
                        <Text typo='head4'>{`분침오류 : \n ${item?.averageMinuteError}°`}</Text>
                      </>
                    )}
                    <Text typo='head4'>{`${item?.userCount}회 도전`}</Text>
                  </Column>
                </DataContainer>
              </Item>
            );
          })}
          <Text typo='body03M'>{`결과 데이터는 최소 1년간 쿠키에 보관됩니다.`}</Text>
        </ContentSection>
      </ModalContent>
    </ModalWrapper>
  );
}

const FilterContainer = styled(CenterRow)`
  width: 100%;
  justify-content: space-evenly;
`;

const FilterItem = styled(Column)`
  gap: 0.5rem;
  cursor: pointer;
`;

const Item = styled(CenterRow)`
  width: 100%;
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

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const ContentSection = styled(Column)`
  gap: 1.375rem;
  padding: ${LAYOUT.PADDING_X}rem;
  padding-top: 2.5rem;
  justify-content: space-evenly;
`;
