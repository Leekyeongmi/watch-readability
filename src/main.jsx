import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { webRouter } from './router/index';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={webRouter} />
);
