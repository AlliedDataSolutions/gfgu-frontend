import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

import { Landing } from "@/features/common";
import NotFound from "@/features/common/pages/NotFound";
import { Login, Register } from "@/features/auth";
import { Home, Payment } from "@/features/customer";
import CartPage from "@/features/store/pages/cartpage"; // import CartPage
import { CheckoutPage } from "@/features/common/pages/CheckoutPage";

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

export const createAppRouter = () =>
  createBrowserRouter([
    { path: paths.landing.path, element: <Landing /> },
    { path: paths.auth.login.path, element: <Login /> },
    { path: paths.auth.register.path, element: <Register /> },
    { path: paths.error.notFound.path, element: <NotFound /> },

    {
      path: paths.store.home.path,
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: paths.store.checkout.path,
      element: (
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      ),
    },
    {
      path: paths.store.payment.path,
      element: (
        <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      ),
    },
    {
      path: paths.store.cartpage.path, // added cart page route
      element: (
        <ProtectedRoute>
          <CartPage />
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

    // Add a route for the CheckoutPage
    { path: "/checkoutpage", element: <CheckoutPage /> },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
