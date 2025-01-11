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

  // Ease-in-out 함수 (혹은 선형 보간법 사용)
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
    let startTime;
    let animationFrameId;

    const updateAnimation = () => {
      const now = new Date();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / animationDurationPhase2, 1);
      const adjustedProgress = easeInOut(progress); // ease-in-out 적용

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
      const totalMinuteDistance = 120 + minuteDistance; // 두 바퀴(120분) + 현재 시간까지 거리
      const currentMinuteDistance = adjustedProgress * totalMinuteDistance;

      setAnimationTime({
        hours: startHours + adjustedProgress * hourDistance,
        minutes: startMinutes + currentMinuteDistance,
        seconds: startSeconds + adjustedProgress * secondDistance
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateAnimation); // 애니메이션 계속 진행
      } else {
        setIsAnimating(false); // 애니메이션 종료
      }
    };

    if (isAnimating) {
      if (animationPhase === 1) {
        startTime = new Date();
        setAnimationPhase(2); // 1단계가 끝나면 2단계로 진행
        animationFrameId = requestAnimationFrame(updateAnimation);
      }
    }

    return () => cancelAnimationFrame(animationFrameId); // 컴포넌트가 언마운트될 때 애니메이션 종료
  }, [isAnimating, animationPhase, currentTime]);

  // 초, 분, 시 계산
  const seconds = isAnimating
    ? animationTime.seconds
    : currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

  const minutes = isAnimating
    ? animationTime.minutes
    : currentTime.getMinutes() + seconds / 
