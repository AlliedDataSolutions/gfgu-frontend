import { Navigate, useLocation } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuth } from "@/features/context/AuthContext";
import InlineLoader from "@/components/ui/inlineloading";
import { Role } from "@/core/role";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[]; // Define allowed roles for this route
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
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

  // Allow admins and vendors to access the store and other allowed routes
  if (
    (user.role as Role) === Role.admin ||
    (user.role as Role) === Role.vendor
  ) {
    return children;
  }

  // Restrict access based on allowedRoles for customers and others
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === Role.vendor) {
      return <Navigate to={paths.vendor.dashboard.path} replace />;
    }
    if (user.role === Role.admin) {
      return <Navigate to={paths.admin.dashboard.path} replace />;
    }
    return <Navigate to={paths.store.home.path} replace />;
  }

  return children;
};
