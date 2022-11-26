import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import Navbar from '../components/Header';
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
          <DashboardSidebar />
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
