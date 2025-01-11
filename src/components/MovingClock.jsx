import { useEffect, useState } from 'react';
import Clock from './Clock';

export default function MovingClock({ type = '1' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(1);
  const [animationTime, setAnimationTime] = useState({
    hours: 10,
    minutes: 10,
    seconds: 35
  });

  const animationDurationPhase1 = 1000; // 1단계 지속 시간
  const animationDurationPhase2 = 4000; // 2단계 지속 시간

  // Ease-in-out 함수
  const easeInOut = (progress) => {
    const easeInPower = 3;  // ease-in 강도
    const easeOutPower = 2; // ease-out 강도
    if (progress < 0.5) {
      return Math.pow(progress * 2, easeInPower) / 2;
    } else {
      return 1 - Math.pow(2 * (1 - progress), easeOutPower) / 2;
    }
  };

  // 오차 선반영을 위해 5초 추가된 구간의 조정
  const additionalTime = 5; // 예상되는 오차 시간 (5초)

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
            seconds: 35
          });

          if (progress === 1) {
            clearInterval(interval);
            setAnimationPhase(2); // 다음 단계로 전환
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
          const targetSeconds = currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

          const startHours = 10;
          const startMinutes = 10;
          const startSeconds = 30;

          const hourDistance = (targetHours - startHours + 12) % 12;
          const minuteDistance = (targetMinutes - startMinutes + 60) % 60;
          const secondDistance = (targetSeconds - startSeconds + 60) % 60;

          // 시침 이동 보정
          const currentHour = startHours + adjustedProgress * hourDistance;
          // 분침과 초침 이동
          const totalMinuteDistance = 120 + minuteDistance;
          const currentMinute = startMinutes + adjustedProgress * totalMinuteDistance;
          const currentSecond = startSeconds + adjustedProgress * secondDistance + additionalTime;

          // 최종 위치에 도달하기 전에 정확한 보정
          const finalHourAngle = currentHour * 30;
          const finalMinuteAngle = currentMinute * 6;
          const finalSecondAngle = currentSecond * 6;

          setAnimationTime({
            hours: currentHour,
            minutes: currentMinute,
            seconds: currentSecond
          });

          if (progress === 1) {
            clearInterval(interval);
            setIsAnimating(false); // 애니메이션 종료
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
