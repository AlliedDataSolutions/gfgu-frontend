import { Navigate, useLocation } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuth } from "@/features/context/AuthContext";
import InlineLoader from "@/components/ui/inlineloading";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If still checking authentication, show a loading screen
  if (loading) {
    return <InlineLoader loading={loading} children={undefined} />;
  }

  if (!user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
