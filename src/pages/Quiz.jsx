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
import LessMovingClock from '../components/LessMovingClock';
import { updateUserData } from '../utils/updateCookie';
import { ToastContainer, toast } from 'react-toastify';
import { LAYOUT } from '../constant';

function Quiz() {
  const totalQuizzes = 7;
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState(null);
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
    hour: '--',
    minute: '--',
    second: '--'
  });

  const [currentField, setCurrentField] = useState('hour');
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
      toast('유효시간을 초과하였거나, 오차범위가 너무 큽니다.');
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
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setShowLottie(false);
      setCurrentQuiz(currentQuiz + 1);
      stopAndResetTimer();
      setUserTime({
        hour: '--',
        minute: '--',
        second: '--'
      });
      setCurrentField('hour');
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

    // alert(
    //   `테스트용 알러트 :
    //   정답은 (시침: ${randomHourAngle}°, 분침: ${randomMinuteAngle}°, 초침: ${randomSecondAngle}°)
    //   당신의 입력은 (시침: ${userHourAngle}°, 분침: ${userMinuteAngle}°, 초침: ${userSecondAngle}°)
    //   시침 오차 각도: ${hourErrorAngle}°
    //   분침 오차 각도: ${minuteErrorAngle}°
    //   초침 오차 각도: ${secondErrorAngle}°
    //   푸는 데 걸린 시간은 ${timer}초
    //   풀고 있는 시계 id값은 ${quizArr[currentQuiz]}
    //   `
    // );
  };

  const handleKeypadInput = (value) => {
    setUserTime((prev) => {
      const fields = ['hour', 'minute', 'second'];
      let newState = { ...prev };

      const currentFieldIndex = fields.findIndex(
        (field) => prev[field] === '--' || prev[field].length < 2
      );

      const currentField =
        currentFieldIndex === -1 ? 'last' : fields[currentFieldIndex];
      let currentValue = currentFieldIndex === -1 ? 'last' : prev[currentField];

      if (value === 'delete') {
        if (currentValue === 'last') {
          newState['second'] = newState['second'].slice(0, 1);
          // setCurrentField('second')
        }

        if (currentValue === '--') {
          if (currentFieldIndex > 0) {
            const prevField = fields[currentFieldIndex - 1];
            newState[prevField] = newState[prevField].slice(0, 1);
            setCurrentField(fields[currentFieldIndex - 1]);
          }
        } else {
          if (currentValue.length === 1) {
            newState[currentField] = '--';
          } else {
            newState[currentField] = currentValue.slice(0, -1);
          }
        }
        return newState;
      }

      if (currentFieldIndex === -1) return prev;

      if (currentValue === '--') {
        currentValue = '';
      }

      newState[currentField] = (currentValue + value).slice(-2);

      const { hour, minute, second } = newState;

      if (parseInt(hour, 10) < 0 || parseInt(hour, 10) > 12) {
        toast('시간을 올바른 형식으로 입력해주세요 예) 03:05:10');
        newState.hour = '--';
        return prev;
      }

      if (parseInt(minute, 10) < 0 || parseInt(minute, 10) > 59) {
        newState.minute = '--';
        toast('시간을 올바른 형식으로 입력해주세요 예) 03:05:10');
        return prev;
      }
      if (parseInt(second, 10) < 0 || parseInt(second, 10) > 59) {
        newState.second = '--';
        toast('시간을 올바른 형식으로 입력해주세요 예) 03:05:10');
        return prev;
      }

      if (newState[currentField].length === 2 && currentFieldIndex < 2) {
        setCurrentField(fields[currentFieldIndex + 1]);
      }

      return newState;
    });
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
    if (currentQuiz === null) return;
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
        {currentQuiz === null ? (
          <Text typo='head4'>{`제시되는 시간을 보고 정답을 제출하세요
            시 분 초 순으로 입력됩니다
            한 자리 숫자는 두 자리로 맞춰 입력해주세요
            예) 03:03:10
            `}</Text>
        ) : (
          <ProgressBar>
            {Array.from({ length: totalQuizzes }).map((_, index) => (
              <Dot
                key={index}
                solved={index < currentQuiz}
                active={index === currentQuiz}
              />
            ))}
          </ProgressBar>
        )}
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
            showLottie={showLottie}
          />
        </ProblemSection>
        <BottomSection>
          <DisplayContainer>
            <DisplayWrapper>
              <Text typo='head01' color='black'>
                {/* {`${userTime.hour} : ${userTime.minute} : ${userTime.second}`} */}

                <CursorWrapper>
                  <Field active={currentField === 'hour'}>
                    {userTime.hour}
                  </Field>
                  <Colon>:</Colon>
                  <Field active={currentField === 'minute'}>
                    {userTime.minute}
                  </Field>
                  <Colon>:</Colon>
                  <Field active={currentField === 'second'}>
                    {userTime.second}
                  </Field>
                </CursorWrapper>
              </Text>
              <ButtonWrapper>
                <BasicButton
                  onClick={() => goToNextQuiz()}
                  size={'s'}
                  width={'4.68rem'}
                  height={'1.5rem'}
                  shape={'round'}
                  disabled={Object.values(userTime).some(
                    (value) => value === '--'
                  )}
                  textProps={{ text: '제출', typo: 'head4' }}
                />
              </ButtonWrapper>
            </DisplayWrapper>
          </DisplayContainer>
          <PickerContainer id='picker'>
            <Keypad>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'].map(
                (value, index) => (
                  <Key
                    key={index}
                    onClick={() => handleKeypadInput(value)}
                    isDelete={value === 'delete'}
                  >
                    <Text typo='head02B'>
                      {value === 'delete' ? '←' : value}
                    </Text>
                  </Key>
                )
              )}
            </Keypad>
          </PickerContainer>

          <div></div>
        </BottomSection>
      </ContentSection>
      {currentQuiz === null && (
        <>
          <Overlay />
          <ButtonContainer gap='1.375rem'>
            <BasicButton
              onClick={() => {
                setCurrentQuiz(0);
                stopAndResetTimer();
              }}
              width={'8.438rem'}
              height={'3.75rem'}
              size={'s'}
              textProps={{ text: '시작하기' }}
              bg={'primary500'}
              style={{ fontWeight: 'bold' }}
              shape={'round'}
            ></BasicButton>
          </ButtonContainer>
        </>
      )}

      <CustomedToast
        autoClose={2500}
        limit={1}
        position='top-right'
        hideProgressBar={true}
        closeButton={false}
      />
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

const DisplayWrapper = styled(CenterRow)`
  position: relative;
`;

const BottomSection = styled(CenterColumn)`
  flex: 0.6;
  justify-content: space-between;
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

const PickerContainer = styled(CenterColumn)`
  gap: 0.75rem;
  border-radius: 18px;
  padding: 0 1rem;
`;

const Keypad = styled.div`
  display: grid;
  z-index: 10;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;

  & > :nth-last-child(2) {
    grid-column: 2 / span 1;
  }
  & > :last-child {
    grid-column: 3 / span 1;
  }
`;

const Key = styled(CenterColumn)`
  background-color: ${({ theme }) => theme.colors.grey300};
  text-align: center;
  width: 4.688rem;
  height: 3rem;
  line-height: 2rem;
  border-radius: 1.125rem;
  cursor: pointer;
`;

export const CustomedToast = styled(ToastContainer)`
  .Toastify__toast {
    width: fit-content;
    min-height: 35px;
    margin-top: 3rem;
    font-size: 12px;
    color: #fff;
    background: #3e3e3e;
    z-index: 100000;
  }
`;

const ButtonContainer = styled(CenterColumn)`
  padding: ${LAYOUT.PADDING_X}rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-bottom: 3.5rem;
  z-index: 10000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 60%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CursorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Field = styled(CenterColumn)`
  position: relative;
  color: ${({ theme }) => theme.colors.black};
  // border-bottom: 1px solid black;
  border-color: ${({ theme, active }) =>
    active ? theme.colors.primary500 : 'transparent'};
  animation: ${({ active }) =>
    active ? 'blink 1s step-end infinite' : 'none'};

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const Colon = styled.span`
  padding: 0 0.2rem;
`;
