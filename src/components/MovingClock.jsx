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
    let animationFrame;
    const startTime = performance.now(); // 애니메이션 시작 시간

    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / (animationPhase === 1 ? animationDurationPhase1 : animationDurationPhase2), 1);
      const adjustedProgress = easeInOut(progress); // ease-in-out 적용

      if (animationPhase === 1) {
        // 1단계: 10시 10분 30초로 이동
        setAnimationTime({
          hours: 10,
          minutes: 10,
          seconds: 30
        });

        if (progress === 1) {
          setAnimationPhase(2); // 2단계로 전환
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

        // 애니메이션 종료 직전에 현재 시간에 가까워지도록 설정
        const finalHours = startHours + adjustedProgress * hourDistance;
        const finalMinutes = startMinutes + adjustedProgress * minuteDistance;
        const finalSeconds = startSeconds + adjustedProgress * secondDistance;

        // 애니메이션 끝나고 현재 시간으로 전환되도록
        setAnimationTime({
          hours: finalHours,
          minutes: finalMinutes,
          seconds: finalSeconds
        });

        if (progress === 1) {
          setIsAnimating(false); // 애니메이션 종료
        }
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate); // 계속 애니메이션 진행
      }
    };

    if (isAnimating) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      // 현재 시간 업데이트
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 30);

      return () => {
        clearInterval(timer);
      };
    }

    return () => cancelAnimationFrame(animationFrame); // cleanup
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
