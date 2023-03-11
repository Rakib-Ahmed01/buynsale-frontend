import { NavLink } from 'react-router-dom';

export default function ProductCategories({ categories, setOpened }) {
  return (
    <nav>
      {categories.slice(0, 10).map((category) => {
        return (
          <NavLink
            className="flex items-center md:px-4 py-2 text-gray-700 hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 rounded-r-full text-center -ml-1"
            to={`/products/${category._id}`}
            key={category._id}
            onClick={() => setOpened(false)}
          >
            <span className="mx-4 font-medium">{category.categoryName}</span>
          </NavLink>
        );
      })}
      <NavLink
        className="flex items-center md:px-4 py-2 text-gray-700 rounded-r-full hover:bg-cyan-200 dark:bg-gray-800 dark:text-gray-200 -ml-1"
        to={`/all-products`}
        onClick={() => setOpened(false)}
      >
        <span className="mx-4 font-medium">All Products</span>
      </NavLink>
    </nav>
  );
}
