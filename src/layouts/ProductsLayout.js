import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Header';
import Sidebar from '../components/Sidebar';

import Loader from '../components/Loader';
import { AuthContext } from '../contexts/UserContext';

const ProductsLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="relative">
      <Navbar />
      <div className="flex gap-1 md:gap-4">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsLayout;
