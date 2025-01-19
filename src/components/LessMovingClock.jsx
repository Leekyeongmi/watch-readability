import { useEffect, useState } from 'react';
import Clock from './Clock';

export default function LessMovingClock({ type = '1', randomTime }) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(1);
  const [animationTime, setAnimationTime] = useState({
    hours: 10,
    minutes: 10,
    seconds: 35
  });

  const animationDurationPhase1 = 1000; // 1단계 지속 시간
  const animationDurationPhase2 = 1000; // 2단계 지속 시간

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
            seconds: 35
          });

          if (progress === 1) {
            clearInterval(interval);
            setAnimationPhase(2); // 다음 단계로 전환
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
          const targetHours = randomTime.randomHour % 12;
          const targetMinutes = randomTime.randomMinute;
          const targetSeconds = randomTime.randomSecond;

          // 시작 시간 (10시 10분 30초)
          const startHours = 10;
          const startMinutes = 10;
          const startSeconds = 35;

          // 애니메이션 거리 계산
          const hourDistance = (targetHours - startHours + 12) % 12;
          const minuteDistance = (targetMinutes - startMinutes + 60) % 60;
          const secondDistance = (targetSeconds - startSeconds + 60) % 60;

          // 분침 두 바퀴 회전 + 현재 시간 이동
          const totalMinuteDistance = 60 + minuteDistance; // 두 바퀴(240분) + 현재 시간까지 거리
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
    }
  }, [isAnimating, animationPhase]);

  // 초, 분, 시 계산
  const seconds = animationTime.seconds;
  const minutes = animationTime.minutes;
  const hours = animationTime.hours;

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
