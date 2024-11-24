import { CenterColumn, Column, Row } from '../components/layouts/Layout';
import ThemeSwitcher from '../components/ThemeSwitcher';
import MovingClock from '../components/MovingClock';
import styled, { useTheme } from 'styled-components';
import { Text } from '../components/atoms/Text';
import { LAYOUT } from '../constant';
import BasicButton from '../components/atoms/BasicButton';
import { useUserTheme } from '../stores/useTheme';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Intro() {
  const theme = useTheme();
  const userTheme = useUserTheme();
  const navigate = useNavigate();

  const [randomWatchType, setRandomWatchType] = useState(null);

  useEffect(() => {
    setRandomWatchType(Math.random() < 0.5 ? 1 : 3);
  }, []);

  return (
    <IntroPage>
      <HeaderSection theme={theme}>
        <Text typo='head04' color='font'>
          {`안녕하세요?
          여기까지 와주신 것에 감사드립니다
          `}
        </Text>
      </HeaderSection>
      <ContentSection>
        <ThemeSwitcher />
        <MovingClock type={randomWatchType} />
        <Text typo='body03M' color='font'>
          {`저희는 손목시계 디자인에 의한 시인성,`} <br />
          <strong>즉 “시간을 얼마나 쉽게 알아볼수 있는가”</strong>
          {`에 호기심을 가지고 
          연구하고 있습니다.여러분이 짧은 테스트에 임해주신다면
          저희 연구에 큰 도움이 될 것입니다 !`}
        </Text>
        <ButtonContainer gap='1rem'>
          <BasicButton
            onClick={() => navigate('/quiz')}
            width={'9.375rem'}
            height={'3.75rem'}
            size={'m'}
            mode={userTheme}
            textProps={{ text: '참여하기' }}
            bg={'button'}
          ></BasicButton>
          <BasicButton
            onClick={() => navigate('/result')}
            width={'9.375rem'}
            height={'3.75rem'}
            size={'m'}
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

const HeaderSection = styled(CenterColumn)`
  text-align: center;
  min-height: 9.25rem;
  gap: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey300};
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.25) !important;
`;

const ContentSection = styled(Column)`
  padding: ${LAYOUT.PADDING_X}rem;
  text-align: center;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled(CenterColumn)`
  padding: ${LAYOUT.PADDING_X}rem;
  text-align: center;
`;
