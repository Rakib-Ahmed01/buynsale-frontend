import { Tooltip } from '@mantine/core';
import { useContext, useState } from 'react';
import { FcMenu } from 'react-icons/fc';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { AuthContext } from '../contexts/UserContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return;
  }

  return (
    <div className="header">
      <header className="bg-white dark:bg-gray-900">
        <nav className="relative bg-white dark:bg-gray-900">
          <div className="container pl-1 pr-1 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">
                <img
                  src={logo}
                  className="h-8 w-8 lg:w-10 lg:h-10"
                  alt="logo"
                />
                <Link
                  className="website-name -ml-[1px] mt-1 text-2xl font-bold  transition-colors duration-300 transform dark:text-white lg:text-3xl dark:hover:text-gray-300 text-blue-500 mb-1"
                  to="/"
                >
                  Buy N Sale
                </Link>
              </div>

              <div className="flex md:hidden">
                <button
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                  }}
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <FcMenu
                    className={`${!isOpen ? 'block' : 'hidden'} w-6 h-6`}
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isOpen ? 'block' : 'hidden'} w-6 h-6`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={`${
                isOpen
                  ? 'translate-x-0 opacity-100'
                  : 'opacity-0 -translate-x-full'
              } absolute inset-x-0 z-20 w-full py-4 transition-all duration-300 pl-2 ease-in-out bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:justify-center md:items-center`}
            >
              <div className="flex flex-col md:flex-row md:items-center ">
                <NavLink
                  className="my-2 font-medium text-base text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-3 md:my-0"
                  to="/home"
                >
                  Home
                </NavLink>
                <NavLink
                  className="my-2 font-medium text-base text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-3 md:my-0"
                  to="/all-products"
                >
                  Products
                </NavLink>

                <NavLink
                  className="my-2 font-medium text-base text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-3 md:my-0"
                  to="/blog"
                >
                  Blog
                </NavLink>
                {!user ? (
                  <>
                    <Link
                      className="my-2 font-medium text-base text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:ml-3 md:my-0"
                      to="/login"
                    >
                      <Tooltip label="Login" position="bottom">
                        <button>
                          <FiLogIn title="login" className="mt-[7px]" />
                        </button>
                      </Tooltip>
                    </Link>
                  </>
                ) : (
                  <>
                    <NavLink
                      className="my-2 font-medium text-base text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-3 md:my-0"
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                    <Tooltip label={user?.displayName}>
                      <img
                        src={user?.photoURL}
                        alt={user?.displayName}
                        className="my-2 md:mx-3 block w-8 h-8 rounded-full"
                      />
                    </Tooltip>
                    <Tooltip label="Logout">
                      <button>
                        <FiLogOut
                          className="my-2 md:mx-3"
                          onClick={logout}
                          position="bottom"
                        />
                      </button>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
