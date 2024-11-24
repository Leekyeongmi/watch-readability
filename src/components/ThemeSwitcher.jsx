import React from 'react';
import styled from 'styled-components';
import useThemeStore from '../stores/useTheme';

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
  align-items: center;
  gap: 0.5rem;
`;

const ToggleSwitch = styled.div`
  width: 50px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.grey300};
  border-radius: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey400};
  }
`;

const ToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  position: absolute;
  left: ${({ isDark }) =>
    isDark ? 'calc(100% - 22px)' : '2px'}; /* 테마에 따라 위치 조정 */
  transition:
    left 0.3s,
    background-color 0.3s;
`;

const IconWrapper = styled.div``;
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
