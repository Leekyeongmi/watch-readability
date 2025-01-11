import { useEffect, useState, useRef } from 'react';
import Clock from './Clock';

export default function MovingClock({ type = '1' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(1);

  // 애니메이션 상태를 useRef로 관리
  const animationTime = useRef({
    hours: 10,
    minutes: 10,
    seconds: 30,
  });

  const animationDurationPhase1 = 1000; // 1단계 지속 시간
  const animationDurationPhase2 = 4000; // 2단계 지속 시간
  const easeInOutPower = 3; // ease-in-out 강도

  const easeInOut = (progress) => {
    if (progress < 0.5) {
      return Math.pow(progress * 2, easeInOutPower) / 2; // ease-in
    } else {
      return 1 - Math.pow(2 * (1 - progress), easeInOutPower) / 2; // ease-out
    }
  };

  useEffect(() => {
    let animationFrame;
    const startTime = performance.now();

    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (animationPhase === 1 ? animationDurationPhase1 : animationDurationPhase2), 1);
      const easedProgress = easeInOut(progress);

      if (animationPhase === 1) {
        // 1단계: 고정된 10:10:30으로 설정
        animationTime.current = {
          hours: 10,
          minutes: 10,
          seconds: 30,
        };
        if (progress === 1) {
          setAnimationPhase(2);
        }
      } else if (animationPhase === 2) {
        // 2단계: 현재 시간으로 이동
        const targetHours = currentTime.getHours() % 12;
        const targetMinutes = currentTime.getMinutes();
        const targetSeconds = currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

        const startHours = 10;
        const startMinutes = 10;
        const startSeconds = 30;

        const hourDistance = (targetHours - startHours + 12) % 12;
        const minuteDistance = (targetMinutes - startMinutes + 60) % 60;
        const secondDistance = (targetSeconds - startSeconds + 60) % 60;

        animationTime.current = {
          hours: startHours + easedProgress * hourDistance,
          minutes: startMinutes + easedProgress * minuteDistance,
          seconds: startSeconds + easedProgress * secondDistance,
        };

        if (progress === 1) {
          setIsAnimating(false);
        }
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isAnimating) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 30);

      return () => clearInterval(timer);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isAnimating, animationPhase, currentTime]);

  // 초, 분, 시 계산
  const seconds = isAnimating
    ? animationTime.current.seconds
    : currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

  const minutes = isAnimating
    ? animationTime.current.minutes
    : currentTime.getMinutes() + seconds / 60;

  const hours = isAnimating
    ? animationTime.current.hours
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
