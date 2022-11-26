import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { AuthContext } from '../contexts/UserContext';

export default function Main() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
