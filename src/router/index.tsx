import { createBrowserRouter } from 'react-router-dom';

import Main from '@/pages/index';

const webRouter = createBrowserRouter([
  {
    path: '/*',
    element: <Main />,
  },
]);

export { webRouter };
