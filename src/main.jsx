import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { webRouter } from './router/index';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { useThemeColors } from './stores/useTheme';

const App = () => {
  const colors = useThemeColors();
  console.log(colors);

  return (
    <ThemeProvider theme={{ ...theme, colors }}>
      <RouterProvider router={webRouter} />
      <GlobalStyle />
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')).render(<App />);
