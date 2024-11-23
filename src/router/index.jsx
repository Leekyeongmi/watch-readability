import { createBrowserRouter } from 'react-router-dom';
import Intro from '../pages/intro';
import JinsungLabs from '../pages/JinsungLabs';
import BaseLayout from '../components/atoms/Baselayout';

const webRouter = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Intro />
      },
      { path: '/jinsung-labs', element: <JinsungLabs /> }
    ]
  }
]);

export { webRouter };
