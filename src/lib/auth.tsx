import { Navigate, useLocation } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuth } from "@/features/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If still checking authentication, show a loading screen
  if (loading) {
    return <p>Loading...</p>; // replace this with a spinner or skeleton
  }

  if (!user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
