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
  overscroll-behavior: none;
  box-sizing:border-box;
}

html {
  font-size: 16px;

}

@media screen and (max-width: ${theme.deviceSizes.mobile}) {
  html {
    font-size: 14px;
    }
  }
    
${theme.devices.largeDesktop} {
  html {
    font-size: 18px;
  }
}

body {
    -webkit-text-size-adjust: none;
    background-color: #FFFFFF;

    & #root {
      background-color: #FFFFFF;  
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
