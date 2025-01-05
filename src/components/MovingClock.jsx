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

  const animationDuration = 1000;

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
        }, 5);
      } else if (animationPhase === 2) {
        // 2단계: 분침이 시계를 한 바퀴 돌기
        const startTime = new Date();
        const animationDuration = 1200; // 1초 동안 애니메이션
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
        }, 1);
      } else if (animationPhase === 3) {
        // 3단계: 현재 시간으로 이동
        const startTime = new Date();
        const animationInterval = setInterval(() => {
          const now = new Date();
          const animationDuration = 250;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDuration, 1);

          // 목표 시간 계산
          const targetHours = currentTime.getHours() % 12;
          const targetMinutes = currentTime.getMinutes();
          const targetSeconds =
            currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

          // 현재 애니메이션 시작 시간 (10시 10분 10초)
          const startHour = 10;
          const startMinute = 10;
          const startSecond = 30;

          // 시계 방향 거리 계산
          const hourDistance = (targetHours - startHour + 12) % 12; // 시침 이동 거리
          const minuteDistance = (targetMinutes - startMinute + 60) % 60; // 분침 이동 거리
          const secondDistance = (targetSeconds - startSecond + 60) % 60; // 초침 이동 거리

          // 현재 위치 업데이트 (progress에 따라 이동)
          setAnimationTime({
            hours: startHour + progress * hourDistance,
            minutes: startMinute + progress * minuteDistance,
            seconds: startSecond + progress * secondDistance
          });

          if (progress === 1) {
            clearInterval(animationInterval);
            setIsAnimating(false);
          }
        }, 1);
      }
    } else {
      // 시간이 1초씩 흐르도록 업데이트
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 30);

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
