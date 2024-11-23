import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { LAYOUT } from '../../constant';
import { Column } from '../layouts/Layout';

export default function BaseLayout() {
  return (
    <BasicLayout>
      <Outlet />
    </BasicLayout>
  );
}

const BasicLayout = styled(Column)`
  position: relative;
  padding: ${LAYOUT.PADDING_X}rem;
  overflow-x: hidden;
`;
