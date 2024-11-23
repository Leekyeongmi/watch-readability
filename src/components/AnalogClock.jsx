import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div`
  width: 200px;
  height: 200px;
  border: 10px solid #333;
  border-radius: 50%;
  position: relative;
  background: #f0f0f0;
`;

const ClockFace = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Hand =
  styled.div <
  { rotation: number, width: number, height: number, color: string } >
  `
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: 50% 100%;
  transform: ${(props) => `translateX(-50%) rotate(${props.rotation}deg)`};
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

const HourHand = styled(Hand)`
  z-index: 2;
`;

const MinuteHand = styled(Hand)`
  z-index: 3;
`;

const SecondHand = styled(Hand)`
  z-index: 4;
`;

const CenterDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #333;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

export default function Component() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondRotation = (seconds / 60) * 360;
  const minuteRotation = ((minutes + seconds / 60) / 60) * 360;
  const hourRotation = ((hours + minutes / 60) / 12) * 360;

  return (
    <ClockContainer>
      <ClockFace>
        <HourHand rotation={hourRotation} width={6} height={60} color='#333' />
        <MinuteHand
          rotation={minuteRotation}
          width={4}
          height={80}
          color='#666'
        />
        <SecondHand
          rotation={secondRotation}
          width={2}
          height={90}
          color='#f00'
        />
        <CenterDot />
      </ClockFace>
    </ClockContainer>
  );
}
