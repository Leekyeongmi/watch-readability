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
import Image from '../components/atoms/Image';

function Intro() {
  const userTheme = useUserTheme();
  const navigate = useNavigate();
  const [randomWatchType, setRandomWatchType] = useState(null);
  const [showImage, setShowImage] = useState(false); // 이미지 표시 여부 상태 추가

  const pickRandomFrom0to6 = () => {
    return String(Math.floor(Math.random() * 7));
  };

  useEffect(() => {
    const randomNum = pickRandomFrom0to6();
    setRandomWatchType(randomNum);

    const timer = setTimeout(() => {
      setShowImage(true);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  if (!randomWatchType) return null;

  return (
    <IntroPage>
      <HeaderSection>
        <Text typo='head2' color='black'>
          {`안녕하세요?
          여기까지 와주신 것에 감사드립니다.
          `}
        </Text>
      </HeaderSection>
      <ContentSection>
        <ClockWrapper>
          <div style={{ position: 'absolute', top: -13 }}>
            <AnimatedImage
              width='90px'
              height='90px'
              src='/santa.png'
              alt='santa.png'
              show={showImage}
            />
          </div>
          <MovingClock type={randomWatchType} />
        </ClockWrapper>
        <Text typo='head4' color='font'>
          {`저희는 손목시계 디자인에 의한 시인성,`} <br />즉{' '}
          <strong>“시간을 얼마나 쉽게 알아볼수 있는가”</strong>
          {`에 호기심을 가지고 
          연구하고 있습니다. 여러분이 짧은 테스트에 임해주신다면
          저희 연구에 큰 도움이 될 것입니다 !`}
        </Text>
        <ButtonContainer gap='0.625rem'>
          <BasicButton
            onClick={() => navigate('/quiz')}
            width={'8.438rem'}
            height={'3.75rem'}
            size={'s'}
            mode={userTheme}
            textProps={{ text: '참여하기' }}
            bg={'button'}
            style={{ fontWeight: 'bold' }}
          ></BasicButton>
          <BasicButton
            onClick={() => navigate('/result')}
            width={'8.438rem'}
            height={'3.75rem'}
            size={'s'}
            mode={userTheme}
            textProps={{ text: '연구현황' }}
            bg={'button'}
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

const AnimatedImage = styled(Image)`
  opacity: 0;
  transition: opacity 1s ease-in-out;

  ${({ show }) =>
    show &&
    `
    opacity: 1; 
  `}
`;
