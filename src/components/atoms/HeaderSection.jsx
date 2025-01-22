import { styled, useTheme } from 'styled-components';
import { CenterColumn } from '../layouts/Layout';

export default function HeaderSection({ children }) {
  const theme = useTheme();
  return <HeaderContainer theme={theme}>{children}</HeaderContainer>;
}

const HeaderContainer = styled(CenterColumn)`
  text-align: center;
  position: relative;
  min-height: 9.25rem;
  gap: 0.5rem;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey300};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25) !important;
`;
