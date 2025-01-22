import { styled, useTheme } from 'styled-components';
import { CenterColumn, CenterRow } from '../layouts/Layout';
import { Text } from './Text';
import LoadingSpinner from './LoadingSpinner';

const BasicButton = ({
  size,
  type,
  shape,
  disabled,
  textProps,
  onClick,
  width,
  mode,
  bg,
  isLoading = false,
  ...props
}) => {
  const theme = useTheme();
  const borderRadius = shape === 'round' ? '0.438rem' : '0.3rem';
  bg = bg ? bg : disabled ? 'black' : type === 'solid' ? 'black' : 'white';
  const color = disabled || mode === 'dark' ? 'white' : 'black';

  const border = () => {
    if (disabled) return 'none';
    switch (type) {
      case 'solid':
        return 'none';
      case 'out_sec':
        return '1px solid black';
      case 'out_pri':
        return '1px solid #DCDCDC';
    }
  };

  const padding = () => {
    switch (size) {
      case 'xs':
        return '0.59375rem 0.75rem';
      case 's':
        return '0.0188rem 1.125rem';
      case 'm':
        return '0.88rem 1.25rem';
      case 'l':
        return '1.15625rem 1rem';
    }
  };

  const typo = () => {
    switch (size) {
      case 'xs':
        return 'c01_m';
      case 's':
        return 'l01_m';
      case 'm':
        return 'b03_semi_b';
      case 'l':
        return 'b01_semi_b';
    }
  };

  return (
    <ButtonWrapper
      theme={theme}
      bg={bg}
      border={border()}
      borderRadius={borderRadius}
      padding={padding()}
      onClick={() => !disabled && onClick()}
      width={width}
      {...props}
    >
      <CenterRow>
        <>
          {isLoading && <LoadingSpinner color='white' size='0.75rem' />}
          <Text
            className={isLoading ? 'invisible-text' : ''}
            typo={textProps?.typo ?? typo()}
            color={textProps?.color ?? color}
            style={{ whiteSpace: 'nowrap' }}
          >
            {textProps?.text}
          </Text>
        </>
      </CenterRow>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled(CenterColumn)`
  position: relative;
  background-color: ${({ bg, theme }) => theme.colors[bg]};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width || 'auto'};
  cursor: pointer;

  .invisible-text {
    visibility: hidden;
  }
`;

export default BasicButton;
