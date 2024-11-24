import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from './atoms/Image';
import { CenterColumn } from './layouts/Layout';

export default function MovingClock({ type = '1' }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(true); // 초기 애니메이션 상태
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
    <Container>
      <ClockWrapper>
        <ClockFace src={`/${type}/index.svg`} />
        <HourHand
          src={`/${type}/hour-hand.svg`}
          rotation={hourRotation}
          zIndex={20}
        />
        <MinuteHand
          src={`/${type}/minute-hand.svg`}
          rotation={minuteRotation}
          zIndex={20}
        />
        <SecondHand
          src={`/${type}/second-hand.svg`}
          rotation={secondRotation}
          zIndex={20}
        />
      </ClockWrapper>
    </Container>
  );
}

const ClockHand = ({ src, rotation, zIndex = 1 }) => {
  return (
    <ClockHandWrapper rotation={rotation} zIndex={zIndex}>
      <img src={src} alt='clock-hand' width='100%' height='100%' />
    </ClockHandWrapper>
  );
};

const Container = styled(CenterColumn)``;

const ClockWrapper = styled.div`
  position: relative;
  width: 10.188rem;
  height: 10.188rem;
`;

const ClockFace = styled(Image)`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 10;
`;

const ClockHandWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center;
  width: 100%;
  height: 100%;
  transform: rotate(${(props) => props.rotation}deg);
  z-index: ${(props) => props.zIndex || 1};
`;

const HourHand = styled(ClockHand)``;
const MinuteHand = styled(ClockHand)``;
const SecondHand = styled(ClockHand)``;
