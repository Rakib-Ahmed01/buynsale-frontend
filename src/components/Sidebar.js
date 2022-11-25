import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { AuthContext } from '../contexts/UserContext';
import ProductCategories from './ProductCategories';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { data: categories, isLoading } = useQuery(
    ['products-categories'],
    async () => {
      const data = await axios(
        `${process.env.REACT_APP_url}/products-categories`
      );
      return data.data;
    }
  );

  if (isLoading) {
    return (
      <div>
        <HashLoader color="#3b82f6" />
      </div>
    );
  }

  return (
    <div className="sidebar sticky top-0">
      <div className="flex flex-col w-36 sm:w-48 md:w-64 h-screen py-8 bg-white  dark:bg-gray-900 dark:border-gray-700">
        {!user ? (
          <div className="flex flex-col px-2">
            <Link className="outline-btn block -mb-2" to="/login">
              Login
            </Link>
            <div className="flex items-center justify-between mt-4">
              <span className="w-2/5 border-b dark:border-gray-600 lg:w-2/5"></span>

              <p>Or</p>

              <span className="w-2/5 border-b dark:border-gray-400 lg:w-2/5"></span>
            </div>
            <Link className="btn block mt-1" to="/register">
              Register
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-6 -mx-2">
            <img
              className="object-cover w-24 h-24 mx-2 rounded-full"
              src={user?.photoURL}
              alt="avatar"
            />
            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
              {user?.displayName}
            </h4>
            <p className="hidden sm:block mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
              {user?.email}
            </p>
          </div>
        )}

        <div className="categories flex flex-col justify-between flex-1 mt-6">
          {categories ? (
            <ProductCategories categories={categories} />
          ) : (
            <div className="text-center m-12">
              <HashLoader color="#3b82f6" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
