import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import ProductCategories from './ProductCategories';

const Sidebar = () => {
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
      <div className="flex flex-col w-[100px] sm:w-48 md:w-64 h-screen py-8 bg-white  dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-center md:px-8 md:text-left text-lg md:text-xl font-bold">
          All Categories
        </h2>

        <div className="categories flex flex-col justify-between flex-1 mt-4">
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
