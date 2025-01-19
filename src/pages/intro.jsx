import { CenterColumn, Column } from '../components/layouts/Layout';
import MovingClock from '../components/MovingClock';
import styled from 'styled-components';
import { Text } from '../components/atoms/Text';
import { LAYOUT } from '../constant';
import BasicButton from '../components/atoms/BasicButton';
import { useUserTheme } from '../stores/useTheme';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeaderSection from '../components/atoms/HeaderSection';

function Intro() {
  const userTheme = useUserTheme();
  const navigate = useNavigate();
  const [randomWatchType, setRandomWatchType] = useState(null);

  const pickRandomFrom0to6 = () => {
    return String(Math.floor(Math.random() * 7));
  };

  useEffect(() => {
    const randomNum = pickRandomFrom0to6();
    setRandomWatchType(randomNum);
  }, []);

  if (!randomWatchType) return null;

  return (
    <IntroPage>
      <HeaderSection>
        <Text typo='head2' color='black'>
          {`시간 가독성/판독성 연구 
          a comparicon of the readability 
          & legibility on time
          `}
        </Text>
      </HeaderSection>
      <ContentSection>
        <ClockWrapper>
          <MovingClock type={randomWatchType} />
        </ClockWrapper>
        <Text typo='head4' color='font'>
          {`저희는 손목시계 디자인의 7가지 기준을 만들고`} <br />
          <strong>시간을 얼마나 쉽고 빠르게 알아볼 수 있는가</strong>를 비교,{' '}
          <br />
          {`연구하고 있습니다. 여러분이 짧은 테스트에 임해주신다면
          연구에 큰 도움이 될 것입니다!`}
        </Text>
        <ButtonContainer gap='1.375rem'>
          <BasicButton
            onClick={() => navigate('/quiz')}
            width={'8.438rem'}
            height={'3.75rem'}
            size={'s'}
            mode={userTheme}
            textProps={{ text: '시작하기' }}
            bg={'primary500'}
            style={{ fontWeight: 'bold' }}
            shape={'round'}
          ></BasicButton>
          <BasicButton
            onClick={() => navigate('/result')}
            width={'8.438rem'}
            height={'3.75rem'}
            size={'s'}
            mode={userTheme}
            textProps={{ text: '연구현황' }}
            bg={'button'}
            shape={'round'}
          ></BasicButton>
        </ButtonContainer>
      </ContentSection>
    </IntroPage>
  );
}

export default Intro;

const IntroPage = styled(Column)`
  height: 100%;
`;

const ContentSection = styled(Column)`
  padding: ${LAYOUT.PADDING_X}rem;
  text-align: center;
  height: 100%;
  justify-content: space-evenly;
`;

const ButtonContainer = styled(CenterColumn)`
  padding: ${LAYOUT.PADDING_X}rem;
  text-align: center;
`;

const ClockWrapper = styled(CenterColumn)`
  position: relative;
`;
