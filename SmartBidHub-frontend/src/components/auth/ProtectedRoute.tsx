import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../../services/authService';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = localStorage.getItem('userRole'); // We saved this in login

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole || '')) {
    return <Navigate to="/" replace />; // Redirect if role doesn't match
  }

  return <Outlet />; // Renders the child routes
};

export default ProtectedRoute;