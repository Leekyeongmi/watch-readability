import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { webRouter } from '@/router/index';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<RouterProvider router={webRouter} />);
