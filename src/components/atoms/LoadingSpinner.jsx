import { ClipLoader } from 'react-spinners';
import { styled, useTheme } from 'styled-components';
import { CenterColumn } from '../layouts/Layout';

export default function LoadingSpinner({
  color = 'primary500',
  size = '1.875rem'
}) {
  const theme = useTheme();

  return (
    <LoadingSpinnerWrapper>
      <ClipLoader loading={true} color={theme.colors[color]} size={size} />
    </LoadingSpinnerWrapper>
  );
}

const LoadingSpinnerWrapper = styled(CenterColumn)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
