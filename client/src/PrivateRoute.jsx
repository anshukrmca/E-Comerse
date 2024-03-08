import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PrivateRoute() {
  const token = localStorage.getItem('token');

  if (!token) {
    // Use toast.warning in a useEffect to avoid synchronous state updates
    setTimeout(() => {
      toast.warning('You are not logged in! Please login.');
    }, 0);

    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
