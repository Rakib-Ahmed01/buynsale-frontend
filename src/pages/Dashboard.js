import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  return <Navigate to="/dashboard/my-orders" replace />;
}
