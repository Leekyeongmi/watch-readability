import { Outlet } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Column } from '../layouts/Layout';
import { useEffect } from 'react';

export default function BaseLayout() {
  const theme = useTheme();
  function updateViewportHeight() {
    const viewportHeight = window.innerHeight;
    document.documentElement.style.setProperty(
      '--vh',
      `${viewportHeight * 0.01}px`
    );
  }

  useEffect(() => {
    console.log('hi');
    updateViewportHeight();
  }, []);

  window.addEventListener('resize', updateViewportHeight);

  return (
    <BasicLayout theme={theme}>
      <Outlet />
    </BasicLayout>
  );
}

const BasicLayout = styled(Column)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background02};
  overflow: hidden;
  height: calc(var(--vh, 1vh) * 100);
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
`;
