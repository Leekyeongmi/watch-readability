import { useEffect } from 'react';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import HeaderSection from '../components/atoms/HeaderSection';
import { CenterColumn, CenterRow, Column } from '../components/layouts/Layout';
import StaticClock from '../components/StaticClock';
import Timer from '../components/Timer';
import { LAYOUT } from '../constant';
import {
  generateRandomTime,
  getTimeFromRotation
} from '../utils/generateRandomTime';
import { shuffleArray } from '../utils/shuffleArray';
import BasicButton from '../components/atoms/BasicButton';
import { useUserTheme } from '../stores/useTheme';
import { Row } from '../components/layouts/Layout';

function Quiz() {
  //TODO 3분 이상 지나가면 타이머 멈춤.
  const theme = useTheme();
  const userTheme = useUserTheme();
  const totalQuizzes = 7;

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rotation, setRotation] = useState({
    hourRotation: 0,
    minuteRotation: 0,
    secondRotation: 0
  });
  const [quizArr, setQuizArr] = useState([]);
  const [userTime, setUserTime] = useState({
    hour: '',
    minute: '',
    second: ''
  });
  const { hour, minute, second } = userTime;
  const [errorInSeconds, setErrorInSeconds] = useState(null);
  const dataToPost = {
    // 시계종류, 걸린 시간, 정답유무, 오차율
    watch: quizArr[currentQuiz],
    timer,
    errorInSeconds,
    userTheme
  };
  // console.log(dataToPost, 'data==');
  const startTimer = () => setIsRunning(true);
  const stopAndResetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  const buttonEnabled = hour != '' && minute != '' && second != '';

  const goToNextQuiz = () => {
    if (!buttonEnabled) return;

    if (currentQuiz < totalQuizzes - 1) {
      calculateError();
      setCurrentQuiz(currentQuiz + 1);
      stopAndResetTimer();
      setUserTime({
        hour: '',
        minute: '',
        second: ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'hour' && (value < 0 || value > 12)) return;
    if ((name === 'minute' || name === 'second') && (value < 0 || value > 59))
      return;

    setUserTime((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      goToNextQuiz();
    }
  };

  const calculateError = () => {
    const randomTime = getTimeFromRotation(rotation);
    const { randomHour, randomMinute, randomSecond } = randomTime;

    const clockTimeInSeconds =
      randomHour * 3600 + randomMinute * 60 + randomSecond;

    let convertedHour = hour == 12 ? 0 : hour;
    const inputTimeInSeconds =
      parseInt(convertedHour) * 3600 + parseInt(minute) * 60 + parseInt(second);

    const errorInSeconds = Math.abs(clockTimeInSeconds - inputTimeInSeconds);
    setErrorInSeconds(errorInSeconds);
    alert(
      `테스트용 알러트 : 
      정답은 ${randomHour + ':' + randomMinute + ':' + randomSecond} 
      당신의 입력은 ${convertedHour + ':' + minute + ':' + second} 
      오차 시간은 ${errorInSeconds}초
      푸는 데 걸린 시간은 ${timer}초
      유저 테마는 ${userTheme}
      풀고 있는 시계 id값은 ${quizArr[currentQuiz]}
      `
    );
  };

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isRunning]);

  useEffect(() => {
    startTimer();
  }, [currentQuiz]);

  useEffect(() => {
    const randomTime = generateRandomTime();
    setRotation(randomTime);
  }, [currentQuiz]);

  useEffect(() => {
    setQuizArr(shuffleArray());
  }, []);

  return (
    <QuizPage>
      <HeaderSection>
        <ProgressBar>
          {Array.from({ length: totalQuizzes }).map((_, index) => (
            <Dot
              theme={theme}
              key={index}
              solved={index < currentQuiz}
              active={index === currentQuiz}
            />
          ))}
        </ProgressBar>
      </HeaderSection>
      <ContentSection>
        <Timer time={timer} />
        <ProblemSection>
          <StaticClock type={quizArr[currentQuiz]} rotation={rotation} />
          <Row gap='0.75rem'>
            <InputWrapper>
              <Input
                type='tel'
                inputMode='numeric'
                pattern='[0-9]+'
                name='hour'
                value={userTime.hour}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='HH'
                min='0'
                max='12'
              />
              <Colon>:</Colon>
              <Input
                type='tel'
                inputMode='numeric'
                pattern='[0-9]+'
                name='minute'
                value={userTime.minute}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                placeholder='MM'
                min='0'
                max='59'
              />
              <Colon>:</Colon>
              <Input
                type='tel'
                pattern='[0-9]+'
                name='second'
                value={userTime.second}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                placeholder='SS'
                min='0'
                max='59'
              />
            </InputWrapper>
            <BasicButton
              disabled={!buttonEnabled}
              onClick={() => goToNextQuiz()}
              size={'s'}
              mode={userTheme}
              textProps={{ text: '제출' }}
            />
          </Row>
        </ProblemSection>
      </ContentSection>
    </QuizPage>
  );
}

export default Quiz;

const QuizPage = styled(Column)`
  height: 100%;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
`;

const Dot = styled.div`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 2px solid
    ${({ active, theme }) => (active ? theme.colors.font : 'transparent')};
  background-color: ${({ theme, solved }) =>
    solved ? theme.colors.font : theme.colors.grey300};
`;

const ContentSection = styled(Column)`
  height: 100%;
  padding: ${LAYOUT.PADDING_X}rem;
`;

const ProblemSection = styled(CenterColumn)`
  gap: 2.5rem;
  height: 100%;
`;

const InputWrapper = styled(CenterRow)`
  width: 15.125rem;
  height: 3.125rem;
  background-color: ${({ theme }) => theme.colors.grey200};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.font};
`;

const Input = styled.input`
  width: 4rem;
  text-align: center;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.font};
`;

const Colon = styled.span`
  font-size: 1.5rem;
  align-self: center;
  margin-bottom: 0.4rem;
`;
