import { styled, useTheme } from 'styled-components';
import { CenterColumn } from '../layouts/Layout';

export default function HeaderSection({ children }) {
  const theme = useTheme();
  return <HeaderContainer theme={theme}>{children}</HeaderContainer>;
}

const HeaderContainer = styled(CenterColumn)`
  text-align: center;
  min-height: 9.25rem;
  gap: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey300};
  // box-shadow: 0 6px 6px rgba(0, 0, 0, 0.25) !important;
`;
