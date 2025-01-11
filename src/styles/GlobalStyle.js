import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select : none;  
  user-select:none;
  -webkit-tap-highlight-color: transparent !important;
  box-shadow: none !important;
  font-display: swap;
  -webkit-user-drag: none;
  box-sizing:border-box;
  overscroll-behavior: none;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}


html {
  font-size: 16px;

}

@media screen and (max-width: ${theme.deviceSizes.mobile}) {
  html {
    font-size: 14px;
    }
  }

  ${theme.devices.smallTablet} {
    html {
      font-size: 20px;
    }
    
  ${theme.devices.largeDesktop} {
    html {
      font-size: 22px;
    }
}

body {
    -webkit-text-size-adjust: none;

    & #root {
      background-color: white;
    }
  }

img {
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

input { 
  -webkit-user-select : auto;
}

`;

export default GlobalStyle;
