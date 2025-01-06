import { useEffect, useState } from 'react';
import Clock from './Clock';

export default function MovingClock({ type = '1' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(1);
  const [animationTime, setAnimationTime] = useState({
    hours: 10,
    minutes: 10,
    seconds: 30,
  });

  const animationDurationPhase1 = 1000; // 1단계 지속 시간
  const animationDurationPhase2 = 1800; // 2단계 지속 시간
  const transitionDuration = 500; // 부드러운 전환 지속 시간

  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  useEffect(() => {
    if (isAnimating) {
      if (animationPhase === 1) {
        // 1단계: 10시 10분 30초로 이동
        const startTime = new Date();
        const interval = setInterval(() => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDurationPhase1, 1);

          setAnimationTime({
            hours: 10,
            minutes: 10,
            seconds: 30,
          });

          if (progress === 1) {
            clearInterval(interval);
            setAnimationPhase(2); // 다음 단계로 전환
          }
        }, 5);
      } else if (animationPhase === 2) {
        // 2단계: 분침이 2바퀴 돌고 초침/시침과 함께 현재 시간으로 이동
        const startTime = new Date();
        const interval = setInterval(() => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDurationPhase2, 1);

          // 현재 시간 계산
          const targetHours = currentTime.getHours() % 12;
          const targetMinutes = currentTime.getMinutes();
          const targetSeconds =
            currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

          // 시작 시간 (10시 10분 30초)
          const startHours = 10;
          const startMinutes = 10;
          const startSeconds = 30;

          // 애니메이션 거리 계산
          const hourDistance = (targetHours - startHours + 12) % 12;
          const minuteDistance = (targetMinutes - startMinutes + 60) % 60;
          const secondDistance = (targetSeconds - startSeconds + 60) % 60;

          // 분침 두 바퀴 회전 + 현재 시간 이동
          const totalMinuteDistance = 240 + minuteDistance; // 두 바퀴(240분) + 현재 시간까지 거리
          const currentMinuteDistance = progress * totalMinuteDistance;

          setAnimationTime({
            hours: startHours + progress * hourDistance,
            minutes: startMinutes + currentMinuteDistance,
            seconds: startSeconds + progress * secondDistance,
          });

          if (progress === 1) {
            clearInterval(interval);
            // 전환 단계 시작
            const transitionStartTime = performance.now();
            const transitionInterval = setInterval(() => {
              const now = performance.now();
              const transitionElapsed = now - transitionStartTime;
              let transitionProgress = Math.min(transitionElapsed / transitionDuration, 1);
              transitionProgress = easeOut(transitionProgress); // 부드러운 전환

              // 실시간 현재 시간으로 부드럽게 이동
              const realTimeHours = currentTime.getHours() % 12;
              const realTimeMinutes = currentTime.getMinutes();
              const realTimeSeconds =
                currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

              setAnimationTime({
                hours:
                  animationTime.hours +
                  transitionProgress * (realTimeHours - animationTime.hours),
                minutes:
                  animationTime.minutes +
                  transitionProgress * (realTimeMinutes - animationTime.minutes),
                seconds:
                  animationTime.seconds +
                  transitionProgress * (realTimeSeconds - animationTime.seconds),
              });

              if (transitionProgress === 1) {
                clearInterval(transitionInterval);
                setIsAnimating(false);
              }
            }, 5);
          }
        }, 1);
      }
    } else {
      // 현재 시간 업데이트
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 30);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isAnimating, animationPhase, currentTime, animationTime]);

  // 초, 분, 시 계산
  const seconds = isAnimating
    ? animationTime.seconds
    : currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

  const minutes = isAnimating
    ? animationTime.minutes
    : currentTime.getMinutes() + seconds / 60;

  const hours = isAnimating
    ? animationTime.hours
    : (currentTime.getHours() % 12) + minutes / 60;

  // 각도 계산
  const hourRotation = hours * 30;
  const minuteRotation = minutes * 6;
  const secondRotation = seconds * 6;

  return (
    <Clock
      type={type}
      rotation={{ hourRotation, minuteRotation, secondRotation }}
    />
  );
}
