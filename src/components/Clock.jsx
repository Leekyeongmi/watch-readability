import styled from 'styled-components';
import Image from './atoms/Image';
import { CenterColumn } from './layouts/Layout';

export default function Clock({ type, rotation, rank }) {
  const { hourRotation, minuteRotation, secondRotation } = rotation;

  return (
    <Container>
      <ClockWrapper rank={rank}>
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

// 사이즈를 순위에 따라 조정
const ClockWrapper = styled.div`
  position: relative;
  width: ${({ rank }) =>
    rank === 1
      ? '9.375rem'
      : rank === 2
        ? '8.125rem'
        : rank === 3
          ? '6.875rem'
          : rank >= 4
            ? '5.625rem'
            : '9.375rem'};
  height: ${({ rank }) =>
    rank === 1
      ? '9.375rem'
      : rank === 2
        ? '8.125rem'
        : rank === 3
          ? '6.875rem'
          : rank >= 4
            ? '5.625rem'
            : '9.375rem'};
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
