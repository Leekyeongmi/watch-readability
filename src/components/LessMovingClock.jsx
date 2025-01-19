import { useEffect, useState } from 'react';
import Clock from './Clock';

export default function MovingClock({ type = '1', randomTime }) {
  const [animationPhase, setAnimationPhase] = useState(1);
  const [animationTime, setAnimationTime] = useState({
    hours: 10,
    minutes: 10,
    seconds: 30
  });

  // console.log(randomTime);

  const animationDurationPhase1 = 1000;
  const animationDurationPhase2 = 2000;

  // Ease-in-out function
  const easeInOut = (progress) => {
    const easeInPower = 3; // Ease-in strength
    const easeOutPower = 2; // Ease-out strength
    if (progress < 0.5) {
      return Math.pow(progress * 2, easeInPower) / 2;
    } else {
      return 1 - Math.pow(2 * (1 - progress), easeOutPower) / 2;
    }
  };

  // Parse `randomTime` into hours, minutes, and seconds
  const targetSeconds = randomTime.randomSecond;
  const targetMinutes = randomTime.randomMinute + targetSeconds / 60;
  const targetHours = (randomTime.randomHour % 12) + targetMinutes / 60;

  useEffect(() => {
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
          setAnimationPhase(2); // Transition to Phase 2
        }
      }, 5);
    } else if (animationPhase === 2) {
      const startTime = new Date();
      const interval = setInterval(() => {
        const now = new Date();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / animationDurationPhase2, 1);

        const adjustedProgress = easeInOut(progress);

        const startHours = 10;
        const startMinutes = 10;
        const startSeconds = 35;

        const hourDistance = (targetHours - startHours + 12) % 12;
        const minuteDistance = (targetMinutes - startMinutes + 60) % 60;
        const secondDistance = (targetSeconds - startSeconds + 60) % 60;

        const totalMinuteDistance = 60 + minuteDistance;
        const currentMinuteDistance = adjustedProgress * totalMinuteDistance;

        setAnimationTime({
          hours: startHours + adjustedProgress * hourDistance,
          minutes: startMinutes + currentMinuteDistance,
          seconds: startSeconds + adjustedProgress * secondDistance
        });

        if (progress === 1) {
          clearInterval(interval);
        }
      }, 5);
    }
  }, [animationPhase, targetHours, targetMinutes, targetSeconds]);

  const seconds = animationTime.seconds;
  const minutes = animationTime.minutes;
  const hours = animationTime.hours;

  // Calculate rotations
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
