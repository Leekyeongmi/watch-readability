import { useEffect, useState } from 'react';
import Clock from './Clock';

export default function MovingClock({ type = '1' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(1); // 애니메이션 단계
  const [animationTime, setAnimationTime] = useState({
    hours: 10,
    minutes: 10,
    seconds: 30
  });

  const animationDuration = 500;

  useEffect(() => {
    if (isAnimating) {
      if (animationPhase === 1) {
        // 1단계: 10시 10분 30초로 이동
        const startTime = new Date();
        const animationInterval = setInterval(() => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);

          setAnimationTime({
            hours: 10,
            minutes: 10,
            seconds: 30
          });

          if (progress === 1) {
            clearInterval(animationInterval);
            setAnimationPhase(2); // 다음 단계로 이동
          }
        }, 10);
      } else if (animationPhase === 2) {
        // 2단계: 분침이 시계를 한 바퀴 돌기
        const startTime = new Date();
        const animationDuration = 1000; // 1초 동안 애니메이션
        const animationInterval = setInterval(() => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);

          setAnimationTime({
            hours: animationTime.hours, // 시침은 유지
            minutes: 10 + progress * 120, // 분침이 정확히 한 바퀴만 돌도록 설정
            seconds: animationTime.seconds // 초침은 유지
          });

          if (progress === 1) {
            clearInterval(animationInterval);
            setAnimationPhase(3); // 다음 단계로 이동
          }
        }, 10);
      } else if (animationPhase === 3) {
        // 3단계: 현재 시간으로 이동
        const startTime = new Date();
        const animationInterval = setInterval(() => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);

          setAnimationTime({
            hours: progress * (currentTime.getHours() % 12),
            minutes: progress * currentTime.getMinutes(),
            seconds:
              progress *
              (currentTime.getSeconds() + currentTime.getMilliseconds() / 1000)
          });

          if (progress === 1) {
            clearInterval(animationInterval);
            setIsAnimating(false);
          }
        }, 10);
      }
    } else {
      // 시간이 1초씩 흐르도록 업데이트
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 25);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isAnimating, animationPhase, currentTime]);

  const seconds = isAnimating
    ? animationTime.seconds
    : currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

  const minutes = isAnimating
    ? animationTime.minutes
    : currentTime.getMinutes() + seconds / 60;

  const hours = isAnimating
    ? animationTime.hours
    : (currentTime.getHours() % 12) + minutes / 60;

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
