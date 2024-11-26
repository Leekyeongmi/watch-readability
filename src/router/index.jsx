import { createBrowserRouter } from 'react-router-dom';
import Intro from '../pages/intro';
import JinsungLabs from '../pages/JinsungLabs';
import BaseLayout from '../components/atoms/Baselayout';
import Quiz from '../pages/Quiz';
import Result from '../pages/Result';

const webRouter = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Intro />
      },
      { path: '/practice', element: <JinsungLabs /> },
      { path: '/quiz', element: <Quiz /> },
      { path: '/result', element: <Result /> },
      { path: '/jinsung-labs', element: <JinsungLabs /> },
      { path: '/*', element: <Intro /> }
    ]
  }
]);

export { webRouter };
