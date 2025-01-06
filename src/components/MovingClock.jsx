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
  const [transitioning, setTransitioning] = useState(false);

  const animationDuration = [1000, 1800]; // 각 단계별 지속 시간
  const smoothTransitionDuration = 500; // 전환 애니메이션 시간

  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  const animateClock = (startValues, endValues, duration, onComplete) => {
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);

      // 보간 처리
      setAnimationTime({
        hours: startValues.hours + progress * (endValues.hours - startValues.hours),
        minutes: startValues.minutes + progress * (endValues.minutes - startValues.minutes),
        seconds: startValues.seconds + progress * (endValues.seconds - startValues.seconds),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        onComplete && onComplete();
      }
    };

    requestAnimationFrame(step);
  };

  const smoothTransition = (startValues, endValues, onComplete) => {
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / smoothTransitionDuration, 1);
      progress = easeOut(progress); // 전환에만 ease-out 적용

      // 보간 처리
      setAnimationTime({
        hours: startValues.hours + progress * (endValues.hours - startValues.hours),
        minutes: startValues.minutes + progress * (endValues.minutes - startValues.minutes),
        seconds: startValues.seconds + progress * (endValues.seconds - startValues.seconds),
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        onComplete && onComplete();
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (isAnimating) {
      if (animationPhase === 1) {
        animateClock(
          { hours: 10, minutes: 10, seconds: 30 },
          { hours: 10, minutes: 10, seconds: 30 },
          animationDuration[0],
          () => setAnimationPhase(2)
        );
      } else if (animationPhase === 2) {
        animateClock(
          { hours: 10, minutes: 10, seconds: 30 },
          {
            hours: currentTime.getHours() % 12,
            minutes: currentTime.getMinutes(),
            seconds: currentTime.getSeconds() + currentTime.getMilliseconds() / 1000,
          },
          animationDuration[1],
          () => {
            setIsAnimating(false);
            setTransitioning(true); // 전환 애니메이션 활성화
          }
        );
      }
    } else if (transitioning) {
      // 부드러운 전환 실행
      smoothTransition(
        animationTime,
        {
          hours: currentTime.getHours() % 12,
          minutes: currentTime.getMinutes(),
          seconds: currentTime.getSeconds() + currentTime.getMilliseconds() / 1000,
        },
        () => setTransitioning(false)
      );
    } else {
      // 실시간 업데이트
      const timer = setInterval(() => setCurrentTime(new Date()), 30);
      return () => clearInterval(timer);
    }
  }, [isAnimating, animationPhase, transitioning, currentTime]);

  // 시간 각도 계산
  const seconds = transitioning || isAnimating
    ? animationTime.seconds
    : currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

  const minutes = transitioning || isAnimating
    ? animationTime.minutes
    : currentTime.getMinutes() + seconds / 60;

  const hours = transitioning || isAnimating
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
