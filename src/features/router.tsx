import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

import { Landing } from "@/features/common";
import NotFound from "@/features/common/pages/NotFound";
import { Login, Register } from "@/features/auth";
import { Home, Checkout, Payment } from "@/features/customer";
import {
  VendorLayout,
  VendorDashboard,
  ManageProducts,
  CreateProduct,
} from "@/features/vendor";

import {
  AdminLayout,
  AdminDashboard,
  ManageUsers,
  SalesReport,
} from "@/features/admin";
import StoreFront from "./store/pages/StoreFront";

export const createAppRouter = () =>
  createBrowserRouter([
    { path: paths.landing.path, element: <Landing /> },
    { path: paths.auth.login.path, element: <Login /> },
    { path: paths.auth.register.path, element: <Register /> },
    { path: paths.error.notFound.path, element: <NotFound /> },
    {path: paths.store.storefront.path, element: <StoreFront />},

    {
      path: paths.customer.home.path,
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: paths.customer.checkout.path,
      element: (
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: paths.customer.payment.path,
      element: (
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      ),
    },

    // Vendor Routes with Nested Pages
    {
      path: paths.vendor.dashboard.path,
      element: (
        <ProtectedRoute>
          <VendorLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <VendorDashboard /> },
        { path: paths.vendor.products.path, element: <ManageProducts /> },
        { path: paths.vendor.addProduct.path, element: <CreateProduct /> },
      ],
    },

    // Admin Routes with Nested Pages
    {
      path: paths.admin.dashboard.path,
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <AdminDashboard /> },
        { path: paths.admin.manageUsers.path, element: <ManageUsers /> },
        { path: paths.admin.salesReport.path, element: <SalesReport /> },
      ],
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
