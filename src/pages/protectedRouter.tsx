import { Navigate } from 'react-router-dom';
import ProtectedRouteProps from '../interfaces/protectedRoute';

const ProtectedRoute = ({ redirectTo, children }: ProtectedRouteProps) => {
  const userId = localStorage.getItem('userId');
  const isLoggedIn = userId === null;

  return isLoggedIn ? children : <Navigate to={redirectTo ?? '/'} replace />;
};

export default ProtectedRoute;
