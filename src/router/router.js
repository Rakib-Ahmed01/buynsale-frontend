import DashboardLayout from '../layouts/DashboardLayout';
import Main from '../layouts/Main';
import ProductsLayout from '../layouts/ProductsLayout';
import AddProduct from '../pages/AddProduct';
import AllBuyers from '../pages/AllBuyers';
import AllSellers from '../pages/AllSellers';
import Blog from '../pages/Blog';
import Dashboard from '../pages/Dashboard';
import Error from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyOrders from '../pages/MyOrders';
import MyProducts from '../pages/MyProducts';
import MyWishlists from '../pages/MyWishlists';
import Products from '../pages/Products';
import ProductsByCategoryId from '../pages/ProductsByCategoryId';
import Register from '../pages/Register';
import ReportedProducts from '../pages/ReportedProducts';
import AdminRoute from '../routes/AdminRoute';
import PrivateRoute from '../routes/PrivateRoute';
import SellerRoute from '../routes/SellerRoute';

const { createBrowserRouter } = require('react-router-dom');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
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
      {
        path: '/blog',
        element: <Blog />,
      },
    ],
  },
  {
    path: '/products',
    element: <ProductsLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/products/:id',
        element: (
          <PrivateRoute>
            <ProductsByCategoryId />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/all-products',
    element: <ProductsLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/dashboard/my-orders',
        element: <MyOrders />,
      },
      {
        path: '/dashboard/my-wishlists',
        element: <MyWishlists />,
      },
      {
        path: '/dashboard/add-product',
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },
      {
        path: '/dashboard/my-products',
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: '/dashboard/all-users',
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/all-sellers',
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: '/dashboard/reported-products',
        element: (
          <AdminRoute>
            <ReportedProducts />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
