import { useEffect, useState } from 'react';
import Clock from './Clock';

export default function MovingClock({ type = '1' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(1);
  const [animationTime, setAnimationTime] = useState({
    hours: 10,
    minutes: 10,
    seconds: 35,
  });

  const animationDurationPhase1 = 1000;
  const animationDurationPhase2 = 4000;
  const additionalTime = 5; // 예상되는 오차 시간 (5초)

  const easeInOut = (progress) => {
    const easeInPower = 3;
    const easeOutPower = 2;
    if (progress < 0.5) {
      return Math.pow(progress * 2, easeInPower) / 2;
    } else {
      return 1 - Math.pow(2 * (1 - progress), easeOutPower) / 2;
    }
  };

  useEffect(() => {
    if (isAnimating) {
      if (animationPhase === 1) {
        const startTime = new Date();
        const interval = setInterval(() => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDurationPhase1, 1);

          setAnimationTime({
            hours: 10,
            minutes: 10,
            seconds: 35,
          });

          if (progress === 1) {
            clearInterval(interval);
            setAnimationPhase(2);
          }
        }, 5);
      } else if (animationPhase === 2) {
        const startTime = new Date();
        const interval = setInterval(() => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDurationPhase2, 1);

          const adjustedProgress = easeInOut(progress);

          const targetHours = currentTime.getHours() % 12;
          const targetMinutes = currentTime.getMinutes();
          const targetSeconds =
            currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

          const startHours = 10;
          const startMinutes = 10;
          const startSeconds = 35;

          const hourDistance = (targetHours - startHours + 12) % 12;
          const minuteDistance = (targetMinutes - startMinutes + 60) % 60;
          const secondDistance = (targetSeconds - startSeconds + 60) % 60;

          // 초침의 보정: 애니메이션 종료 지점에서만 적용
          const correctedSeconds = startSeconds + adjustedProgress * secondDistance + additionalTime;

          // 시침과 분침 각도 차이 반영
          const totalMinuteDistance = minuteDistance + 120; // 두 바퀴(120분)
          const correctedMinutes = startMinutes + adjustedProgress * totalMinuteDistance;
          
          const totalHourDistance = hourDistance;
          const correctedHours = startHours + adjustedProgress * totalHourDistance;

          // 로그 출력 (추적)
          console.log(`Hours: ${correctedHours}, Minutes: ${correctedMinutes}, Seconds: ${correctedSeconds}`);

          setAnimationTime({
            hours: correctedHours,
            minutes: correctedMinutes,
            seconds: correctedSeconds,
          });

          if (progress === 1) {
            clearInterval(interval);
            setAnimationTime({
              hours: targetHours,
              minutes: targetMinutes,
              seconds: targetSeconds,
            });
            setIsAnimating(false);
          }
        }, 1);
      }
    } else {
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
