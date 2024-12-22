import React from 'react';
import styled from 'styled-components';
import Image from './atoms/Image';
import { CenterColumn } from './layouts/Layout';

export default function Clock({ type, rotation }) {
  const { hourRotation, minuteRotation, secondRotation } = rotation;
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
