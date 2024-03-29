import { Tooltip } from '@mantine/core';
import { useContext } from 'react';
import { GoVerified } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';
import useUserStatus from '../hooks/useUserStatus';

const DashboardSidebar = ({ classes, isDrawer, setOpened = () => {} }) => {
  const { user } = useContext(AuthContext);
  const { userStatus, loading } = useUserStatus(user?.email);

  if (loading) {
    return;
  }
  return (
    <div className={`sidebar sticky top-0 ${classes}`}>
      <div className="flex flex-col w-26 sm:w-48 md:w-64 h-screen bg-white  dark:bg-gray-900 dark:border-gray-700">
        <h2
          className={`text-center md:px-8 md:text-left text-2xl font-bold -mt-6 ${
            isDrawer ? 'block' : 'hidden'
          }`}
        >
          Dashboard
        </h2>
        <div className="flex flex-col items-center my-4 mx-2">
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={user?.photoURL}
            alt="avatar"
          />
          {userStatus.role === 'buyer' || !userStatus.isSeller ? (
            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
              {user?.displayName} (
              <span className="capitalize">{userStatus?.role}</span>)
            </h4>
          ) : (
            <Tooltip label="Veified Seller">
              <div className="flex justify-center items-center gap-[4px] mt-2">
                <h2 className="font-medium text-gray-800 dark:text-gray-200 hover:underline">
                  {userStatus?.name}{' '}
                  <span className="capitalize">({userStatus?.role})</span>
                </h2>
                <button>
                  <GoVerified className="w-4 h-4 text-cyan-500" />
                </button>
              </div>
            </Tooltip>
          )}
          <p className="sm:block mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
            {user?.email}
          </p>
        </div>
        <div onClick={() => setOpened(false)}>
          <NavLink
            className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 -ml-1"
            to={`/dashboard/my-orders`}
          >
            <span className="mx-4 font-medium">My Orders</span>
          </NavLink>
          <NavLink
            className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 -ml-1"
            to={`/dashboard/my-wishlists`}
          >
            <span className="mx-4 font-medium">My Wishlists</span>
          </NavLink>
          {userStatus?.role === 'seller' || userStatus?.role === 'admin' ? (
            <>
              <NavLink
                className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 -ml-1"
                to={`/dashboard/add-product`}
              >
                <span className="mx-4 font-medium">Add Product</span>
              </NavLink>
              <NavLink
                className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 -ml-1"
                to={`/dashboard/my-products`}
              >
                <span className="mx-4 font-medium">My Products</span>
              </NavLink>
            </>
          ) : (
            <></>
          )}
          {userStatus?.role === 'admin' && (
            <>
              <NavLink
                className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 -ml-1"
                to={`/dashboard/all-users`}
              >
                <span className="mx-4 font-medium">All Users</span>
              </NavLink>
              <NavLink
                className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 -ml-1"
                to={`/dashboard/all-sellers`}
              >
                <span className="mx-4 font-medium">All Sellers</span>
              </NavLink>
              <NavLink
                className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 -ml-1"
                to={`/dashboard/reported-products`}
              >
                <span className="mx-4 font-medium">Reported Products</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
