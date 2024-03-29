import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <>
      <footer className="bg-white dark:bg-gray-900">
        <div className="container px-1 md:px-6 py-8 mx-auto">
          <hr className="my-10 border-gray-200 dark:border-gray-700" />
          <div className="text-center">
            <div className="flex gap-1 justify-center items-center">
              <img src={logo} className="h-8 w-8 lg:w-10 lg:h-10" alt="logo" />
              <Link
                className="website-name -ml-[1px] mt-1 text-2xl font-bold  transition-colors duration-300 transform dark:text-white lg:text-2xl border-cyan-500 mb-1 dark:hover:text-gray-300 text-cyan-500/80"
                to="/"
              >
                Buy N Sale
              </Link>
            </div>

            <p className="max-w-md mx-auto mt-2 text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              animi iure quisquam corporis dignissimos ut quo aut, facilis
              pariatur exercitationem tenetur ab, praesentium, laboriosam esse.
            </p>
          </div>

          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <h5 className="text-sm text-gray-400">
              © Copyright 2022. All Rights Reserved.
            </h5>

            <div className="flex mt-3 -mx-2 sm:mt-0">
              <Link
                to="/all-products"
                className="mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Reddit"
              >
                Products
              </Link>

              <Link
                to="/blog"
                className="mx-2 text-sm text-gray-400 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Reddit"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
