import { Drawer } from '@mantine/core';
import { useContext, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import Footer from '../components/Footer';
import Navbar from '../components/Header';
import Loader from '../components/Loader';
import { AuthContext } from '../contexts/UserContext';

const ProductsLayout = () => {
  const { loading } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="relative">
      <Navbar />
      <div className="flex md:gap-4">
        <div className="h-screen sticky top-0">
          <DashboardSidebar classes={'hidden md:block'} />
        </div>
        <div className="w-[98%] md:container mx-auto">
          <Outlet />
        </div>
      </div>
      <div className="md:hidden">
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          className="md:hidden p-1"
          transitionDuration={500}
        >
          <DashboardSidebar
            classes={'block'}
            isDrawer={true}
            setOpened={setOpened}
          />
        </Drawer>
        <div
          className="w-12 h-12 rounded-full bg-cyan-500 flex justify-center items-center fixed left-1 bottom-3  md:hidden cursor-pointer"
          onClick={() => setOpened(true)}
        >
          <FiMenu color="white" className="w-5 h-5" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsLayout;
