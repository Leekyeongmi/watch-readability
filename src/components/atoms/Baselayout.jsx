import { Outlet } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { LAYOUT } from '../../constant';
import { Column } from '../layouts/Layout';
import { Text } from './Text';
import theme from '../../styles/theme';

export default function BaseLayout() {
  const theme = useTheme();
  return (
    <BasicLayout theme={theme}>
      <Text typo='head01' color='black'>
        시계 인덱스에 따른 시인성 연구
      </Text>
      <Outlet />
    </BasicLayout>
  );
}

const BasicLayout = styled(Column)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${LAYOUT.PADDING_X}rem;
  overflow-x: hidden;
  min-height: 100svh;
`;
