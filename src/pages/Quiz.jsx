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
  getRotationFromTime
} from '../utils/generateRandomTime';
import { shuffleArray } from '../utils/shuffleArray';
import BasicButton from '../components/atoms/BasicButton';
import { useUserTheme } from '../stores/useTheme';
import { Row } from '../components/layouts/Layout';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  //TODO 데이터 무효화, 인풋 디자인 수정
  const theme = useTheme();
  const userTheme = useUserTheme();
  const totalQuizzes = 7;
  const navigate = useNavigate();
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
  const [errorInAngle, setErrorInAngle] = useState(null);

  const { hourErrorAngle, minuteErrorAngle, secondErrorAngle } =
    errorInAngle ?? {
      hourErrorAngle: 0,
      mintueErrorAngle: 0,
      secondErrorAngle: 0
    };

  const dataToPost = {
    clockId: quizArr[currentQuiz],
    elapsedTime: timer,
    hourErrorAngle,
    minuteErrorAngle,
    secondErrorAngle,
    theme: userTheme
  };

  const startTimer = () => setIsRunning(true);
  const stopAndResetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  const buttonEnabled = hour != '' && minute != '' && second != '';

  async function submitProblemData({
    clockId,
    elapsedTime,
    hourErrorAngle,
    minuteErrorAngle,
    secondErrorAngle,
    theme
  }) {
    try {
      await addDoc(collection(firestore, 'problems'), {
        clockId: clockId,
        elapsedTime: elapsedTime,
        hourErrorAngle,
        minuteErrorAngle,
        secondErrorAngle,
        theme: theme,
        timestamp: serverTimestamp()
      });
      console.log('데이터 저장 성공');
    } catch (e) {
      console.error('데이터 저장 실패: ', e);
    }
  }

  const goToNextQuiz = () => {
    if (!buttonEnabled) return;

    if (currentQuiz == totalQuizzes - 1) {
      navigate('/result');
    }

    if (currentQuiz < totalQuizzes - 1) {
      calculateError();
      setCurrentQuiz(currentQuiz + 1);
      stopAndResetTimer();
      setUserTime({
        hour: '',
        minute: '',
        second: ''
      });
      submitProblemData(dataToPost);
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
    const calculateAngleDifference = (actualAngle, userAngle) => {
      const difference = Math.abs(actualAngle - userAngle);
      return Math.min(difference, 360 - difference);
    };

    const { hour, minute, second } = userTime;
    const userAngle = getRotationFromTime(hour, minute, second);

    const {
      hourRotation: userHourAngle,
      minuteRotation: userMinuteAngle,
      secondRotation: userSecondAngle
    } = userAngle;

    const {
      hourRotation: randomHourAngle,
      minuteRotation: randomMinuteAngle,
      secondRotation: randomSecondAngle
    } = rotation;

    console.log(userAngle, '===유저인풋의 각도 in error');
    console.log(rotation, '===퀴즈의 각도 in error');

    const hourErrorAngle = calculateAngleDifference(
      randomHourAngle,
      userHourAngle
    );
    const minuteErrorAngle = calculateAngleDifference(
      randomMinuteAngle,
      userMinuteAngle
    );
    const secondErrorAngle = calculateAngleDifference(
      randomSecondAngle,
      userSecondAngle
    );

    setErrorInAngle({ hourErrorAngle, minuteErrorAngle, secondErrorAngle });

    alert(
      `테스트용 알러트 : 
      정답은 (시침: ${randomHourAngle}°, 분침: ${randomMinuteAngle}°, 초침: ${randomSecondAngle}°)
      당신의 입력은 (시침: ${userHourAngle}°, 분침: ${userMinuteAngle}°, 초침: ${userSecondAngle}°)
      시침 오차 각도: ${hourErrorAngle}°
      분침 오차 각도: ${minuteErrorAngle}°
      초침 오차 각도: ${secondErrorAngle}°
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
