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
  head1: FONT({
    weight: 600,
    size: 1.125,
    lineHeight: 187.5
  }),
  head2: FONT({
    weight: 400,
    size: 1.125,
    lineHeight: 187.5
  }),
  head3: FONT({
    weight: 600,
    size: 0.938,
    lineHeight: 168.75
  }),
  head4: FONT({
    weight: 300,
    size: 0.938,
    lineHeight: 168.75
  }),
  head01: FONT({
    weight: 700,
    size: 1.75,
    lineHeight: 160
  }),
  head02B: FONT({
    weight: 700,
    size: 1.5,
    lineHeight: 150
  }),
  head03: FONT({
    weight: 700,
    size: 1.25,
    lineHeight: 150
  }),
  head04: FONT({
    weight: 700,
    size: 1,
    lineHeight: 170
  }),
  body01B: FONT({
    weight: 700,
    size: 1,
    lineHeight: 150
  }),
  body01M: FONT({
    weight: 500,
    size: 1,
    lineHeight: 150
  }),
  body02B: FONT({
    weight: 700,
    size: 0.875,
    lineHeight: 145
  }),
  body02M: FONT({
    weight: 500,
    size: 0.875,
    lineHeight: 145
  }),
  body03B: FONT({
    weight: 700,
    size: 0.75,
    lineHeight: 150
  }),
  body03M: FONT({
    weight: 500,
    size: 0.75,
    lineHeight: 190
  }),
  detail01M: FONT({
    weight: 500,
    size: 0.6875,
    lineHeight: 145
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
