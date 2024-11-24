import { Outlet } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Column } from '../layouts/Layout';

export default function BaseLayout() {
  const theme = useTheme();
  return (
    <BasicLayout theme={theme}>
      <Outlet />
    </BasicLayout>
  );
}

const BasicLayout = styled(Column)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  overflow-x: hidden;
  height: 100svh;
`;
