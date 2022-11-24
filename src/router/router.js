import Main from '../layouts/Main';
import Home from '../pages/Home';

const { createBrowserRouter } = require('react-router-dom');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-xl">Something Went Wrong</h1>
      </div>
    ),
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
