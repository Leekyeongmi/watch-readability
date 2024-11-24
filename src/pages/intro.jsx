import { CenterColumn, Column } from '../components/layouts/Layout';
import ThemeSwitcher from '../components/ThemeSwitcher';
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
        <Text typo='head04' color='font'>
          {`안녕하세요?
          여기까지 와주신 것에 감사드립니다
          `}
        </Text>
      </HeaderSection>
      <ContentSection>
        <ThemeSwitcher />
        {<MovingClock type={randomWatchType} />}

        <Text typo='body03M' color='font'>
          {`저희는 손목시계 디자인에 의한 시인성,`} <br />
          <strong>즉 “시간을 얼마나 쉽게 알아볼수 있는가”</strong>
          {`에 호기심을 가지고 
          연구하고 있습니다. 여러분이 짧은 테스트에 임해주신다면
          저희 연구에 큰 도움이 될 것입니다 !`}
        </Text>
        <ButtonContainer gap='1rem'>
          <BasicButton
            onClick={() => navigate('/quiz')}
            width={'9.375rem'}
            height={'3.75rem'}
            size={'s'}
            mode={userTheme}
            textProps={{ text: '참여하기' }}
            bg={'button'}
          ></BasicButton>
          <BasicButton
            onClick={() => navigate('/result')}
            width={'9.375rem'}
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
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled(CenterColumn)`
  padding: ${LAYOUT.PADDING_X}rem;
  text-align: center;
`;
