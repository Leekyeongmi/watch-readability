import { lightColors } from './colors';

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
  colors: lightColors,
  fonts,
  devices,
  deviceSizes
};

export default theme;
