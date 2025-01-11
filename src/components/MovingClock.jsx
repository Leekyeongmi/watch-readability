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

  const [currentTimeTransition, setCurrentTimeTransition] = useState(false);

  const animationDurationPhase1 = 1000; // 1단계 지속 시간
  const animationDurationPhase2 = 4000; // 2단계 지속 시간
  const transitionDuration = 1000; // 현재시간으로의 부드러운 전환

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
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDurationPhase2, 1);

          const adjustedProgress = easeInOut(progress); // ease-in-out 적용

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

          // 애니메이션 업데이트
          setAnimationTime({
            hours: startHours + adjustedProgress * hourDistance,
            minutes: startMinutes + adjustedProgress * minuteDistance,
            seconds: startSeconds + adjustedProgress * secondDistance
          });

          if (progress === 1) {
            clearInterval(interval);
            setCurrentTimeTransition(true); // 전환 시작
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

  // 두 번째 애니메이션: 현재 시간으로 천천히 전환
  useEffect(() => {
    if (currentTimeTransition) {
      const startTime = new Date();
      const interval = setInterval(() => {
        const now = new Date();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / transitionDuration, 1);

        // 현재 시간 계산
        const targetHours = currentTime.getHours() % 12;
        const targetMinutes = currentTime.getMinutes();
        const targetSeconds = currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

        // 애니메이션 업데이트
        setAnimationTime({
          hours: animationTime.hours + progress * (targetHours - animationTime.hours),
          minutes: animationTime.minutes + progress * (targetMinutes - animationTime.minutes),
          seconds: animationTime.seconds + progress * (targetSeconds - animationTime.seconds)
        });

        if (progress === 1) {
          clearInterval(interval);
          setIsAnimating(false); // 애니메이션 종료
        }
      }, 1);
    }
  }, [currentTimeTransition, currentTime]);

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
