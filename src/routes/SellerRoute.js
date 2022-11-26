import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthContext } from '../contexts/UserContext';
import useUserStatus from '../hooks/useUserStatus';

export default function SellerRoute({ children }) {
  const { user } = useContext(AuthContext);
  const { userStatus, loading } = useUserStatus(user?.email);

  if (loading) {
    return <Loader />;
  }

  if (userStatus?.role !== 'admin' && userStatus?.role !== 'seller') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
