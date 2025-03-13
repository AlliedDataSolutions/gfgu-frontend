import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

import { Landing } from "@/features/common";
import NotFound from "@/features/common/pages/NotFound";
import { Login, Register } from "@/features/auth";
import { Payment } from "@/features/customer";
import CartPage from "@/features/store/pages/cartpage";
import ProductsPage from "@/features/store/pages/productpage"; // import ProductPage
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
import ProductDetails from "./store/pages/ProductDetails";
import ProductListing from "./store/pages/ProductListing";
import StoreFront from "./store/pages/StoreFront";

import AccountLayout from "@/features/customer/pages/AccountLayout";
import AddressList from "@/features/customer/pages/AddressList";
import AddAddress from "./customer/pages/AddAddress";

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
          <StoreFront />
        </ProtectedRoute>
      ),
    },
    {
      path: paths.store.listing.path,
      element: (
        <ProtectedRoute>
          <ProductListing />
        </ProtectedRoute>
      ),
    },
    {
      path: `${paths.store.productDetail.path}/:id`,
      element: (
        <ProtectedRoute>
          <ProductDetails />
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
    {
      path: paths.store.productpage.path, // added product page route
      element: (
        <ProtectedRoute>
          <ProductsPage />
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

    {
      path: "/account",
      element: (
        <ProtectedRoute>
          <AccountLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          // When no child is specified, redirect to /account/address
          index: true,
          element: <Navigate to="address" replace />,
        },
        {
          path: "address",
          element: <AddressList />,
        },
        {
          path: "add-address",
          element: <AddAddress />,
        },
        {
          path: "orders",
          element: <div>My Orders (Placeholder)</div>,
        },
      ],
    },

    // Add a route for the CheckoutPage
    { path: "/checkoutpage", element: <CheckoutPage /> },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
