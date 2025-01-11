import { useEffect, useState } from 'react';
import Clock from './Clock';

export default function MovingClock({ type = '1' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(1);
  const [animationTime, setAnimationTime] = useState({
    hours: 10,
    minutes: 10,
    seconds: 30
  });

  const animationDurationPhase1 = 1000; // 1단계 지속 시간
  const animationDurationPhase2 = 4000; // 2단계 지속 시간

  // Ease-in-out 함수
  const easeInOut = (progress) => {
    const easeInPower = 3;  // ease-in 강도
    const easeOutPower = 2; // ease-out 강도
    if (progress < 0.5) {
      // Ease-in 구간
      return Math.pow(progress * 2, easeInPower) / 2;
    } else {
      // Ease-out 구간
      return 1 - Math.pow(2 * (1 - progress), easeOutPower) / 2;
    }
  };

  useEffect(() => {
    let accumulatedElapsed = 0; // 경과 시간 누적 변수
    let lastUpdateTime = Date.now(); // 마지막 업데이트 시점

    const updateElapsed = () => {
      const currentTimeMillis = Date.now();
      const elapsed = currentTimeMillis - lastUpdateTime;
      lastUpdateTime = currentTimeMillis;

      accumulatedElapsed += elapsed;
    };

    if (isAnimating) {
      if (animationPhase === 1) {
        // 1단계: 10시 10분 30초로 이동
        const startTime = new Date();
        const interval = setInterval(() => {
          updateElapsed(); // 경과 시간 갱신

          const elapsed = accumulatedElapsed;
          const progress = Math.min(elapsed / animationDurationPhase1, 1);

          setAnimationTime({
            hours: 10,
            minutes: 10,
            seconds: 30
          });

          if (progress === 1) {
            clearInterval(interval);
            setAnimationPhase(2); // 다음 단계로 전환
          }
        }, 5);
      } else if (animationPhase === 2) {
        // 2단계: 현재 시간으로 이동
        const startTime = new Date();
        const interval = setInterval(() => {
          updateElapsed(); // 경과 시간 갱신

          const elapsed = accumulatedElapsed;
          const progress = Math.min(elapsed / animationDurationPhase2, 1);
          const adjustedProgress = easeInOut(progress);

          // 현재 시간 계산
          const targetHours = currentTime.getHours() % 12;
          const targetMinutes = currentTime.getMinutes();
          const targetSeconds = currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

          // 시작 시간 (10시 10분 30초)
          const startHours = 10;
          const startMinutes = 10;
          const startSeconds = 30;

          // 애니메이션 거리 계산
          const hourDistance = (targetHours - startHours + 12) % 12;
          const minuteDistance = (targetMinutes - startMinutes + 60) % 60;
          const secondDistance = (targetSeconds - startSeconds + 60) % 60;

          // 분침 두 바퀴 회전 + 현재 시간 이동
          const totalMinuteDistance = 120 + minuteDistance; // 두 바퀴(120분) + 현재 시간까지 거리
          const currentMinuteDistance = adjustedProgress * totalMinuteDistance;

          setAnimationTime({
            hours: startHours + adjustedProgress * hourDistance,
            minutes: startMinutes + currentMinuteDistance,
            seconds: startSeconds + adjustedProgress * secondDistance
          });

          if (progress === 1) {
            clearInterval(interval);
            setIsAnimating(false); // 애니메이션 종료
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
  }, [isAnimating, animationPhase, currentTime]);

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
