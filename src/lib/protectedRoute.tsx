import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo: string;
}

const ProtectedProfile: React.FC<ProtectedRouteProps> = ({ children, redirectTo }) => {
  const isAuthenticated = !!localStorage.getItem('userId');

  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />;
};

export default ProtectedProfile;
