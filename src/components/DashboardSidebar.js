import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import useUserStatus from '../hooks/useUserStatus';

const DashboardSidebar = () => {
  const { user } = useContext(AuthContext);
  const { userStatus, loading } = useUserStatus(user?.email);

  if (loading) {
    return;
  }
  return (
    <div className="sidebar sticky top-0">
      <div className="flex flex-col w-[100px] sm:w-48 md:w-64 h-screen bg-white  dark:bg-gray-900 dark:border-gray-700">
        <NavLink
          className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200"
          to={`/dashboard/my-orders`}
        >
          <span className="mx-4 font-medium">My Orders</span>
        </NavLink>
        <NavLink
          className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200"
          to={`/dashboard/my-wishlists`}
        >
          <span className="mx-4 font-medium">My Wishlists</span>
        </NavLink>
        {userStatus?.role === 'seller' ||
          (userStatus?.role === 'admin' && (
            <>
              <NavLink
                className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200"
                to={`/dashboard/add-product`}
              >
                <span className="mx-4 font-medium">Add Product</span>
              </NavLink>
              <NavLink
                className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200"
                to={`/dashboard/my-products`}
              >
                <span className="mx-4 font-medium">My Products</span>
              </NavLink>
            </>
          ))}
        {userStatus?.role === 'admin' && (
          <>
            <NavLink
              className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200"
              to={`/dashboard/all-buyers`}
            >
              <span className="mx-4 font-medium">All Buyers</span>
            </NavLink>
            <NavLink
              className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200"
              to={`/dashboard/all-sellers`}
            >
              <span className="mx-4 font-medium">All Sellers</span>
            </NavLink>
            <NavLink
              className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200"
              to={`/dashboard/reported-products`}
            >
              <span className="mx-4 font-medium">Reported Products</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
