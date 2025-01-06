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
  const animationDurationPhase2 = 1800; // 2단계 지속 시간
  const easeOutDuration = 300; // 2단계 끝에서 부드럽게 전환되는 시간

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
            setAnimationPhase(2); // 2단계로 전환
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
            seconds: startSeconds + progress * secondDistance
          });

          if (progress === 1) {
            clearInterval(interval);
            setIsAnimating(false); // 애니메이션 종료
          }
        }, 1);
      }
    } else {
      // 부드러운 ease-out 전환 처리
      const easeOutStartTime = new Date();
      const easeOutInterval = setInterval(() => {
        const now = new Date();
        const elapsed = now - easeOutStartTime;
        const easeOutProgress = Math.min(elapsed / easeOutDuration, 1);
        
        // ease-out 효과를 적용하여 부드럽게 전환
        const easedHours = animationTime.hours + (currentTime.getHours() % 12 - animationTime.hours) * easeOutProgress;
        const easedMinutes = animationTime.minutes + (currentTime.getMinutes() - animationTime.minutes) * easeOutProgress;
        const easedSeconds = animationTime.seconds + (currentTime.getSeconds() + currentTime.getMilliseconds() / 1000 - animationTime.seconds) * easeOutProgress;

        setAnimationTime({
          hours: easedHours,
          minutes: easedMinutes,
          seconds: easedSeconds
        });

        if (easeOutProgress === 1) {
          clearInterval(easeOutInterval); // ease-out 종료
        }
      }, 1);

      return () => {
        clearInterval(easeOutInterval);
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
