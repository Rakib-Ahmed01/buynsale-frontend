import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Header';
import Sidebar from '../components/Sidebar';

const ProductsLayout = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="flex gap-3 pr-3">
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
