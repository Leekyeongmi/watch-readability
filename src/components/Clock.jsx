import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Image from './atoms/Image';

const ClockContainer = styled.div`
  width: 30rem;
  height: 30rem;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ClockFace = styled(Image)`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 10;
`;

const ClockHand = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center;
  transform: rotate(${(props) => props.rotation}deg);
  z-index: 20;
`;

const HourHand = styled(ClockHand)`
  z-index: 30;
`;

const MinuteHand = styled(ClockHand)`
  z-index: 50;
`;

const SecondHand = styled(ClockHand)`
  z-index: 100;
`;

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours() % 12;

  const hourRotation = (hours + minutes / 60) * 30;
  const minuteRotation = (minutes + seconds / 60) * 6;
  const secondRotation = seconds * 6;

  return (
    <ClockContainer>
      <ClockFace src='/index/index.svg' />
      <HourHand
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 600 600'
        rotation={hourRotation}
        duration={43200}
      >
        <g fill='#fff100'>
          <path d='M300,281.98c-9.94,0-18,8.06-18,18,0,9.94,8.06,18,18,18,9.94,0,18-8.06,18-18,0-9.94-8.06-18-18-18ZM300,304.48c-2.49,0-4.5-2.01-4.5-4.5,0-2.49,2.01-4.5,4.5-4.5s4.5,2.01,4.5,4.5-2.01,4.5-4.5,4.5Z' />
          <rect x='290' y='280.48' width='20' height='15' />
          <polygon points='310 281.95 290 281.95 271 191.95 329 191.95 310 281.95' />
          <polygon points='300 141.98 271 191.98 329 191.98 300 141.98' />
        </g>
      </HourHand>

      <MinuteHand
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 600 600'
        rotation={minuteRotation}
        duration={3600}
      >
        <g fill='#fff100'>
          <path d='M300,285c-8.28,0-15,6.72-15,15,0,8.28,6.72,15,15,15,8.28,0,15-6.72,15-15,0-8.28-6.72-15-15-15ZM300,304.5c-2.49,0-4.5-2.01-4.5-4.5,0-2.49,2.01-4.5,4.5-4.5s4.5,2.01,4.5,4.5c0,2.49-2.01,4.5-4.5,4.5Z' />
          <rect x='285' y='93.25' width='30' height='176.75' />
          <rect x='292.5' y='280.5' width='15' height='15' />
          <polygon points='307.5 285 292.5 285 285 270 315 270 307.5 285' />
          <polygon points='315 93.25 285 93.25 300 72.5 315 93.25' />
        </g>
      </MinuteHand>

      <SecondHand
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 600 600'
        rotation={secondRotation}
        duration={60}
      >
        <g fill='#fff100'>
          <path d='M300,286.45c-7.46,0-13.5,6.04-13.5,13.5s6.04,13.5,13.5,13.5,13.5-6.04,13.5-13.5-6.04-13.5-13.5-13.5ZM300,304.45c-2.49,0-4.5-2.01-4.5-4.5s2.01-4.5,4.5-4.5,4.5,2.01,4.5,4.5-2.01,4.5-4.5,4.5Z' />
          <polygon points='306 358 294 358 296.88 313.45 302.88 313.45 306 358' />
          <rect x='297' y='133.75' width='6' height='161.7' />
          <rect x='296.88' y='304.45' width='6' height='9' />
          <polygon points='300 364 294 358 306 358 300 364' />
          <polygon points='303 133.75 297 133.75 287.66 117.5 312.66 117.5 303 133.75' />
          <polygon points='299.95 60 287.66 117.5 312.66 117.5 299.95 60' />
        </g>
      </SecondHand>
    </ClockContainer>
  );
}
