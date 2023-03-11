import { Drawer } from '@mantine/core';
import { useContext, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../contexts/UserContext';

const ProductsLayout = () => {
  const { loading } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  if (loading) {
    return;
  }
  return (
    <div className="relative">
      <Navbar />
      <div className="flex md:gap-4">
        <div className="h-screen sticky top-0">
          <Sidebar classes={'hidden md:block'} />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <div className="md:hidden">
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          className="md:hidden p-1"
          transitionDuration={600}
        >
          <Sidebar classes={'block'} isDrawer={true} setOpened={setOpened} />
        </Drawer>
        <div
          className={`w-12 h-12 rounded-full bg-cyan-500 justify-center items-center fixed left-1 bottom-3 md:hidden ${
            opened ? 'hidden' : 'flex'
          } cursor-pointer`}
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
