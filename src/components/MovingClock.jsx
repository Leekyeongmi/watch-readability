import React, { useEffect, useState } from 'react';
import Clock from './Clock';

export default function MovingClock({ type = '1' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationTime, setAnimationTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (isAnimating) {
      const startTime = new Date();
      const animationDuration = 500;
      const animationInterval = setInterval(() => {
        const now = new Date();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);

        setAnimationTime({
          hours: progress * (currentTime.getHours() % 12),
          minutes: progress * currentTime.getMinutes(),
          seconds:
            progress *
            (currentTime.getSeconds() + currentTime.getMilliseconds() / 1000)
        });

        if (progress === 1) {
          clearInterval(animationInterval);
          setIsAnimating(false);
        }
      }, 10);
    } else {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 50);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isAnimating, currentTime]);

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
