import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import HeaderSection from '../components/atoms/HeaderSection';
import { CenterColumn, CenterRow, Column } from '../components/layouts/Layout';
import Timer from '../components/Timer';

import { getRotationFromTime } from '../utils/generateRandomTime';
import { shuffleArray } from '../utils/shuffleArray';
import BasicButton from '../components/atoms/BasicButton';

import { Row } from '../components/layouts/Layout';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { Text } from '../components/atoms/Text';
import HomeButton from '../components/components/HomeButton';
import NavSection from '../components/atoms/NavSection';
import Lottie from 'react-lottie-player';
import PassJson from '../components/test.json';
import LessMovingClock from '../components/LessMovingClock';
import { updateUserData } from '../utils/updateCookie';
import WheelPicker from 'react-wheelpicker';

function Quiz() {
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
  const [randomTime, setRandomTime] = useState({});
  const [showLottie, setShowLottie] = useState(false);
  const [quizArr, setQuizArr] = useState([]);
  const [userTime, setUserTime] = useState({
    hour: '00',
    minute: '00',
    second: '00'
  });

  const startTimer = () => setIsRunning(true);
  const stopAndResetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  async function submitProblemData({
    clockId,
    elapsedTime,
    hourErrorAngle,
    minuteErrorAngle,
    secondErrorAngle
  }) {
    if (
      elapsedTime >= 60 ||
      hourErrorAngle > 90 ||
      minuteErrorAngle > 90 ||
      secondErrorAngle > 120
    ) {
      alert('유효시간을 초과하였거나, 오차범위가 너무 큽니다.');
      return;
    }

    updateUserData({
      clockId,
      elapsedTime,
      hourErrorAngle,
      minuteErrorAngle,
      secondErrorAngle
    });

    try {
      await addDoc(collection(firestore, 'problems'), {
        clockId: clockId,
        elapsedTime: elapsedTime,
        hourErrorAngle,
        minuteErrorAngle,
        secondErrorAngle,
        timestamp: serverTimestamp()
      });
      console.log('데이터 저장 성공');
    } catch (e) {
      console.error('데이터 저장 실패: ', e);
    }
  }

  const goToNextQuiz = async () => {
    if (currentQuiz == totalQuizzes - 1) {
      navigate('/result');
    }

    if (currentQuiz < totalQuizzes - 1) {
      calculateError();
      setShowLottie(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowLottie(false);
      setCurrentQuiz(currentQuiz + 1);
      stopAndResetTimer();
      setUserTime({
        hour: '00',
        minute: '00',
        second: '00'
      });
    }
  };

  const selections = {
    hour: Array.from({ length: 13 }, (_, i) => String(i)),
    minuteTens: Array.from({ length: 6 }, (_, i) => String(i)), // 0 to 5
    minuteOnes: Array.from({ length: 10 }, (_, i) => String(i)), // 0 to 9
    secondTens: Array.from({ length: 6 }, (_, i) => String(i)), // 0 to 5
    secondOnes: Array.from({ length: 10 }, (_, i) => String(i)) // 0 to 9
  };

  const updateUserTime = (type, value) => {
    setUserTime((prev) => ({
      ...prev,
      [type]: value
    }));
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

    // console.log(userAngle, '===유저인풋의 각도 in error');
    // console.log(rotation, '===퀴즈의 각도 in error');

    const hourErrorAngle = calculateAngleDifference(
      randomHourAngle,
      userHourAngle
    ).toFixed(2);
    const minuteErrorAngle = calculateAngleDifference(
      randomMinuteAngle,
      userMinuteAngle
    ).toFixed(2);
    const secondErrorAngle = calculateAngleDifference(
      randomSecondAngle,
      userSecondAngle
    ).toFixed(2);

    const dataToPost = {
      clockId: quizArr[currentQuiz],
      elapsedTime: timer,
      hourErrorAngle: parseFloat(hourErrorAngle),
      minuteErrorAngle: parseFloat(minuteErrorAngle),
      secondErrorAngle: parseFloat(secondErrorAngle)
    };

    submitProblemData(dataToPost);
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
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const startTimerWithDelay = async () => {
      await sleep(2000);
      startTimer();
    };
    startTimerWithDelay();
  }, [currentQuiz]);

  useEffect(() => {
    const randomHour = Math.floor(Math.random() * 12);
    const randomMinute = Math.floor(Math.random() * 60);
    const randomSecond = Math.floor(Math.random() * 60);
    const randomRotation = getRotationFromTime(
      randomHour,
      randomMinute,
      randomSecond
    );

    setRotation(randomRotation);
    setRandomTime({ randomHour, randomMinute, randomSecond });
  }, [currentQuiz]);

  useEffect(() => {
    setQuizArr(shuffleArray());
  }, []);

  useEffect(() => {
    const quizPage = document.querySelector('#quiz-page');
    const picker = document.querySelector('#picker');

    const handleTouchMove = (event) => {
      if (picker.contains(event.target)) {
        return;
      }

      if (quizPage.contains(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <QuizPage id='quiz-page'>
      <HeaderSection>
        <ProgressBar>
          {Array.from({ length: totalQuizzes }).map((_, index) => (
            <Dot
              key={index}
              solved={index < currentQuiz}
              active={index === currentQuiz}
            />
          ))}
        </ProgressBar>
      </HeaderSection>
      <NavSection>
        <Timer time={timer} />
        <HomeButton />
      </NavSection>
      <ContentSection>
        <ProblemSection>
          <LessMovingClock
            type={quizArr[currentQuiz]}
            randomTime={randomTime}
          />
        </ProblemSection>
        <BottomSection>
          <DisplayContainer>
            <DisplayWrapper>
              <Text typo='head01' color='black'>
                {`${userTime.hour} : ${userTime.minute} : ${userTime.second}`}
              </Text>
              <ButtonWrapper>
                <BasicButton
                  onClick={() => goToNextQuiz()}
                  size={'s'}
                  width={'4.68rem'}
                  height={'1.5rem'}
                  shape={'round'}
                  bg={'white'}
                  textProps={{ text: '제출', typo: 'head4' }}
                />
              </ButtonWrapper>
            </DisplayWrapper>
          </DisplayContainer>
          <PickerContainer id='picker'>
            <TimePickerWrapper>
              <WheelPicker
                touchEnabled={true}
                key={`key-${currentQuiz}`}
                data={selections.hour}
                height={35}
                parentHeight={200}
                fontSize={13}
                defaultSelection={userTime.hour}
                updateSelection={(selectedIndex) => {
                  // 마지막 인덱스 초과 여부 확인
                  const validIndex = Math.min(
                    selectedIndex,
                    selections.hour.length - 1
                  );
                  updateUserTime('hour', selections.hour[validIndex]);
                }}
                scrollerId='scroll-select-hour'
              />
            </TimePickerWrapper>
            <Container>
              <TimePickerWrapper>
                <WheelPicker
                  key={`key-${currentQuiz}`}
                  data={selections.minuteTens}
                  height={35}
                  parentHeight={200}
                  fontSize={13}
                  defaultSelection={0}
                  updateSelection={(selectedIndex) => {
                    // 마지막 인덱스 초과 여부 확인
                    const validIndex = Math.min(
                      selectedIndex,
                      selections.minuteTens.length - 1
                    );
                    const minuteOnes = userTime.minute[1]; // Keep ones place
                    const newMinute = `${selections.minuteTens[validIndex]}${minuteOnes}`;
                    updateUserTime('minute', newMinute);
                  }}
                  scrollerId='scroll-select-minute-tens'
                />
              </TimePickerWrapper>

              <TimePickerWrapper>
                <WheelPicker
                  key={`key-${currentQuiz}`}
                  data={selections.minuteOnes}
                  height={35}
                  parentHeight={200}
                  fontSize={13}
                  defaultSelection={0}
                  updateSelection={(selectedIndex) => {
                    // 마지막 인덱스 초과 여부 확인
                    const validIndex = Math.min(
                      selectedIndex,
                      selections.minuteOnes.length - 1
                    );
                    const minuteTens = userTime.minute[0]; // Keep tens place
                    const newMinute = `${minuteTens}${selections.minuteOnes[validIndex]}`;
                    updateUserTime('minute', newMinute);
                  }}
                  scrollerId='scroll-select-minute-ones'
                />
              </TimePickerWrapper>
            </Container>
            <Container>
              <TimePickerWrapper>
                <WheelPicker
                  touchEnabled={true}
                  key={`key-${currentQuiz}`}
                  data={selections.secondTens}
                  height={35}
                  parentHeight={200}
                  fontSize={13}
                  defaultSelection={0}
                  updateSelection={(selectedIndex) => {
                    // 마지막 인덱스 초과 여부 확인
                    const validIndex = Math.min(
                      selectedIndex,
                      selections.secondTens.length - 1
                    );
                    const secondOnes = userTime.second[1]; // Keep ones place
                    const newSecond = `${selections.secondTens[validIndex]}${secondOnes}`;
                    updateUserTime('second', newSecond);
                  }}
                  scrollerId='scroll-select-second-tens'
                />
              </TimePickerWrapper>

              <TimePickerWrapper>
                <WheelPicker
                  key={`key-${currentQuiz}`}
                  data={selections.secondOnes}
                  height={35}
                  parentHeight={200}
                  fontSize={13}
                  defaultSelection={0}
                  updateSelection={(selectedIndex) => {
                    const validIndex = Math.min(
                      selectedIndex,
                      selections.secondOnes.length - 1
                    );
                    const secondTens = userTime.second[0]; // Keep tens place
                    const newSecond = `${secondTens}${selections.secondOnes[validIndex]}`;
                    updateUserTime('second', newSecond);
                  }}
                  scrollerId='scroll-select-second-ones'
                />
              </TimePickerWrapper>
            </Container>
          </PickerContainer>

          <div></div>
        </BottomSection>
      </ContentSection>
      {showLottie && (
        <LottieWrapper>
          <Lottie
            animationData={PassJson}
            play
            style={{ width: 150, height: 150 }}
          />
        </LottieWrapper>
      )}
    </QuizPage>
  );
}

export default Quiz;

const QuizPage = styled(Column)`
  height: 100%;
  overflow-y: hidden;
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
    ${({ active, theme }) => (active ? theme.colors.primary500 : 'transparent')};
  background-color: ${({ theme, solved }) =>
    solved ? theme.colors.primary500 : theme.colors.grey300};
`;

const ContentSection = styled(Column)`
  height: 100%;
  justify-content: space-evenly;
`;

const ProblemSection = styled(CenterColumn)`
  flex: 0.4;
`;

const LottieWrapper = styled(Column)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DisplayWrapper = styled(CenterRow)`
  position: relative;
`;

const BottomSection = styled(CenterColumn)`
  flex: 0.6;
  justify-content: space-between;
`;

const TimePickerWrapper = styled(Column)`
  width: 28px;
  background-color: ${({ theme }) => theme.colors.background01};
  z-index: 10000;
`;

const ButtonWrapper = styled(Row)`
  position: absolute;
  left: calc(100% + 2rem);
`;

const DisplayContainer = styled(CenterRow)`
  background-color: ${({ theme }) => theme.colors.grey400};
  width: 100%;
  height: 44px;
`;

const Container = styled(Row)`
  background-color: ${({ theme }) => theme.colors.red};
`;

const PickerContainer = styled(Row)`
  gap: 0.75rem;
  border-radius: 18px;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.colors.background01};
  z-index: 10000;

  .scroll-item {
    padding: 0;
  }
`;
