import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Text } from './atoms/Text';
import { CenterColumn, Column } from './layouts/Layout';

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
      <Text typo='head03' color={'negative'}>
        {formatTime(time)}
      </Text>
    </TimerWrapper>
  );
};

export default Timer;

const TimerWrapper = styled(CenterColumn)`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.grey200};
  width: 6.75rem;
  height: 2.25rem;
`;
