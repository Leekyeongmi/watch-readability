import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { webRouter } from './router/index';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={webRouter} />
    <GlobalStyle />
  </ThemeProvider>
);
