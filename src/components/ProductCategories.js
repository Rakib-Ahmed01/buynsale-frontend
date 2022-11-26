import { NavLink } from 'react-router-dom';

export default function ProductCategories({ categories }) {
  return (
    <nav>
      {categories.map((category) => {
        return (
          <NavLink
            className="flex items-center md:px-4 py-2 text-gray-700 hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200 rounded-r-full            "
            to={`/products/${category._id}`}
            key={category._id}
          >
            <span className="mx-4 font-medium">{category.categoryName}</span>
          </NavLink>
        );
      })}
      <NavLink
        className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-200"
        to={`/all-products`}
      >
        <span className="mx-4 font-medium">All Products</span>
      </NavLink>
    </nav>
  );
}
