import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { LAYOUT } from '../../constant';
import { CenterColumn, Column } from '../layouts/Layout';

export default function BaseLayout() {
  return (
    <BasicLayout>
      <h2>시계 인덱스에 따른 시인성 연구</h2>
      <Outlet />
    </BasicLayout>
  );
}

const BasicLayout = styled(Column)`
  position: relative;
  padding: ${LAYOUT.PADDING_X}rem;
  overflow-x: hidden;
  min-height: 100svh;
`;
