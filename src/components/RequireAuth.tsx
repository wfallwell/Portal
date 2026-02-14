import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../auth';

interface RequireAuthProps {
  children: React.ReactNode;
}

/** Redirects to /login if not authenticated. For demo, auth is stored in sessionStorage. */
export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
