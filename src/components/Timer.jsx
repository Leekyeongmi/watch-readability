import styled, { useTheme } from 'styled-components';
import { Text } from './atoms/Text';
import { CenterColumn } from './layouts/Layout';

const Timer = ({ time }) => {
  const theme = useTheme();

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      '0'
    );
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <TimerWrapper theme={theme}>
      <Text typo='head4' color={'primary500'}>
        {formatTime(time)}
      </Text>
    </TimerWrapper>
  );
};

export default Timer;

const TimerWrapper = styled(CenterColumn)``;
