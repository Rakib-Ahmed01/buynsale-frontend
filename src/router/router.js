import Main from '../layouts/Main';
import ProductsLayout from '../layouts/ProductsLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Products';
import ProductsByCategoryId from '../pages/ProductsByCategoryId';
import Register from '../pages/Register';

const { createBrowserRouter } = require('react-router-dom');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/products',
    element: <ProductsLayout />,
    children: [
      {
        path: '/products/:id',
        element: <ProductsByCategoryId />,
      },
    ],
  },
  {
    path: '/all-products',
    element: <ProductsLayout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
    ],
  },
]);

export default router;
