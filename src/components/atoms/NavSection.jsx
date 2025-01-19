import { styled } from 'styled-components';
import { Row } from '../layouts/Layout';
import { LAYOUT } from '../../constant';

export default function NavSection({ children }) {
  return <NavContainer>{children}</NavContainer>;
}

const NavContainer = styled(Row)`
  min-height: 2.75rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${LAYOUT.PADDING_X}rem;
`;
