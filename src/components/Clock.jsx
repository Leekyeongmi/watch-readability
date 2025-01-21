import styled, { keyframes, css } from 'styled-components';
import Image from './atoms/Image';
import { CenterColumn } from './layouts/Layout';

export default function Clock({ type, rotation, rank, showLottie }) {
  const { hourRotation, minuteRotation, secondRotation } = rotation;

  return (
    <Container>
      <ClockWrapper rank={rank}>
        <HighlightCircle showHighlight={showLottie} />
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

const highlightPulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  50% {
    transform: scale(1.0);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0;
  }
`;

const ClockWrapper = styled.div`
  position: relative;
  width: ${({ rank }) =>
    rank === 1
      ? '150px'
      : rank === 2
        ? '130px'
        : rank === 3
          ? '110px'
          : rank >= 4
            ? '90px'
            : '150px'};
  height: ${({ rank }) =>
    rank === 1
      ? '150px'
      : rank === 2
        ? '130px'
        : rank === 3
          ? '110px'
          : rank >= 4
            ? '90px'
            : '150px'};
`;

const HighlightCircle = styled.div`
  position: absolute;
  top: 4%;
  left: 4%;
  width: 92%;
  height: 92%;
  border-radius: 50%;
  pointer-events: none;
  ${({ showHighlight }) =>
    showHighlight &&
    css`
      animation: ${highlightPulse} 3s infinite;
      border: 8px solid rgba(0, 255, 0, 0.8);
    `}
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
