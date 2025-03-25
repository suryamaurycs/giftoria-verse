
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface RequireAuthProps {
  children: JSX.Element;
  requireAdmin?: boolean;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if admin rights are required but the user is not an admin
  if (requireAdmin && !isAdmin) {
    // Redirect to the home page if the user doesn't have sufficient privileges
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
