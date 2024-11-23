import React from 'react';
import styled from 'styled-components';
import useThemeStore from '../stores/useTheme';

const ThemeSwitcher = () => {
  const { userTheme, setTheme } = useThemeStore();
  console.log(userTheme);
  const isDark = userTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <ToggleSwitch onClick={toggleTheme}>
      <ToggleCircle isDark={isDark} />
    </ToggleSwitch>
  );
};

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
  left: ${({ isDark }) => (isDark ? 'calc(100% - 22px)' : '2px')};
  transition:
    left 0.3s,
    background-color 0.3s;
`;

export default ThemeSwitcher;
