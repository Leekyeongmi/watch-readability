import React from 'react';
import styled from 'styled-components';
import useThemeStore from '../stores/useTheme';
import { CenterColumn } from './layouts/Layout';

const ThemeSwitcher = () => {
  const { userTheme, setTheme } = useThemeStore();
  const isDark = userTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Container>
      <IconWrapper style={{ visibility: isDark ? 'hidden' : 'visible' }}>
        <SunIcon />
      </IconWrapper>
      <ToggleSwitch onClick={toggleTheme}>
        <ToggleCircle isDark={isDark} />
      </ToggleSwitch>
      {isDark && <MoonIcon />}
    </Container>
  );
};

export default ThemeSwitcher;

const Container = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleSwitch = styled.div`
  width: 3rem; /* 48px */
  height: 1.5rem; /* 24px */
  background-color: ${({ theme }) => theme.colors.grey300};
  border-radius: 0.75rem; /* 12px */
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.125rem; /* 2px */
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey400};
  }
`;

const ToggleCircle = styled.div`
  width: 1.25rem; /* 20px */
  height: 1.25rem; /* 20px */
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  position: absolute;
  left: ${({ isDark }) =>
    isDark
      ? 'calc(100% - 1.375rem)'
      : '0.125rem'}; /* 22px -> 1.375rem, 2px -> 0.125rem */
  transition:
    left 0.3s,
    background-color 0.3s;
`;

const IconWrapper = styled(CenterColumn)``;
const SunIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle cx='12' cy='12' r='5' fill='#FFA500' />
    <path
      d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'
      stroke='#FFA500'
      strokeWidth='2'
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z'
      fill='#FFD700'
    />
  </svg>
);
