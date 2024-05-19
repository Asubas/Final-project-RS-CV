import { ReactNode } from 'react';

export default interface ProtectedRouteProps {
  redirectTo?: string;
  children: ReactNode;
}
