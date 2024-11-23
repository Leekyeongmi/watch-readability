/* 컬러 */
const colors = {
  primary50: '#FFE5F3',
  primary100: '#FFCCE7',
  primary200: '#FF99CF',
  primary300: '#FF66B8',
  primary400: '#FF33A0',
  primary500: '#FF1B94',
  primary600: '#0060CC',
  primary700: '#990052',
  primary800: '#001833',
  primary900: '#33001B',

  negative: '#FF2D46',
  warning: '#FFCA43',
  positive: '#15A65B',
  informational: '#66AEFF',

  white: '#FFF',
  grey50: '#F9F9F9',
  grey100: '#F3F3F3',
  grey200: '#EBEBEB',
  grey300: '#DCDCDC',
  grey400: '#B8B8B8',
  grey500: '#999',
  grey600: '#707070',
  grey700: '#5D5D5D',
  grey800: '#3E3E3E',
  grey900: '#1D1D1D',
  black: '#000',

  background01: '#F9FAFA',
  background02: '#F1F3F5'
};

/* 폰트 */
const FONT = ({ weight, size, lineHeight }) => {
  return `
      font-weight : ${weight};
      font-size : ${size}rem;
      line-height : ${lineHeight}%;
      `;
};

const fonts = {
  head01: FONT({
    weight: 700,
    size: 1.75,
    lineHeight: 160
  })
};

const deviceSizes = {
  mobile: '375px',
  smallTablet: '768px',
  smallDesktop: '1024px',
  largeDesktop: '1920px'
};

const devices = {
  mobile: `@media screen and (min-width: ${deviceSizes.mobile})`,
  smallTablet: `@media screen and (min-width: ${deviceSizes.smallTablet})`,
  smallDesktop: `@media screen and (min-width: ${deviceSizes.smallDesktop})`,
  largeDesktop: `@media screen and (min-width: ${deviceSizes.largeDesktop})`
};

export const theme = {
  colors,
  fonts,
  devices,
  deviceSizes
};

export default theme;
