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
  const animationDurationPhase2 = 3000; // 2단계 지속 시간 (부드러운 전환을 위해 길게 설정)

  useEffect(() => {
    let animationFrameId;
    if (isAnimating) {
      if (animationPhase === 1) {
        const startTime = new Date();
        const animatePhase1 = () => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDurationPhase1, 1);

          setAnimationTime({
            hours: 10,
            minutes: 10,
            seconds: 30
          });

          if (progress === 1) {
            setAnimationPhase(2);
          } else {
            animationFrameId = requestAnimationFrame(animatePhase1);
          }
        };

        animationFrameId = requestAnimationFrame(animatePhase1);
      } else if (animationPhase === 2) {
        const startTime = new Date();
        const animatePhase2 = () => {
          const now = new Date();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / animationDurationPhase2, 1);

          const targetHours = currentTime.getHours() % 12;
          const targetMinutes = currentTime.getMinutes();
          const targetSeconds =
            currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;

          const startHours = 10;
          const startMinutes = 10;
          const startSeconds = 30;

          const hourDistance = (targetHours - startHours + 12) % 12;
          const minuteDistance = (targetMinutes - startMinutes + 60) % 60;
          const secondDistance = (targetSeconds - startSeconds + 60) % 60;

          const totalMinuteDistance = 240 + minuteDistance;
          const currentMinuteDistance = progress * totalMinuteDistance;

          const easeProgress = progress < 1 ? Math.pow(progress, 3) : 1;

          setAnimationTime({
            hours: startHours + easeProgress * hourDistance,
            minutes: startMinutes + easeProgress * currentMinuteDistance,
            seconds: startSeconds + easeProgress * secondDistance
          });

          if (progress === 1) {
            setIsAnimating(false);
          } else {
            animationFrameId = requestAnimationFrame(animatePhase2);
          }
        };

        animationFrameId = requestAnimationFrame(animatePhase2);
      }
    } else {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 30);

      return () => {
        clearInterval(timer);
      };
    }

    return () => cancelAnimationFrame(animationFrameId); // Clean up on component unmount
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
