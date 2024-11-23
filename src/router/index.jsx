import { createBrowserRouter } from 'react-router-dom';
import Intro from '../pages/intro';
import JinsungLabs from '../pages/JinsungLabs';

const webRouter = createBrowserRouter([
  {
    path: '/',
    element: <Intro />
  },
  {
    path: '/jinsung-labs',
    element: <JinsungLabs />
  }
]);

export { webRouter };
