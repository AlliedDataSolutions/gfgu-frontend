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
import CheckoutPage from "@/features/customer/pages/CheckoutPage";

import {
  VendorLayout,
  VendorDashboard,
  CreateProduct,
  VendorOrders,
} from "@/features/vendor";
import ManageProducts from "./vendor/pages/ManageProducts";

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
import { MyOrder } from "./customer/pages/MyOrder";
import { PersonalInfo } from "./customer/pages/PersonInfo";
import  AdminProduct  from "./admin/pages/AdminProduct";
import { AdminPayment } from "./admin/pages/AdminPayment";
import { Profile } from "./admin/pages/Profile";
import { Role } from "@/core/role";
import { EditAdminProduct } from "./admin/pages/EditAdminProduct";

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
      path: `${paths.store.listing.path}/:categoryId?`,
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
      path: paths.store.cartPage.path, // added cart page route
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
        <ProtectedRoute allowedRoles={[Role.vendor, Role.admin]}>
          <VendorLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <VendorDashboard /> },
        { path: paths.vendor.orders.path, element: <VendorOrders /> },
        { path: paths.vendor.products.path, element: <ManageProducts /> },
        { path: paths.vendor.addProduct.path+"/:id", element: <CreateProduct /> },

      ],
    },

    // Admin Routes with Nested Pages
    {
      path: paths.admin.dashboard.path,
      element: (
        <ProtectedRoute allowedRoles={[Role.admin]}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <AdminDashboard /> },
        { path: paths.admin.product.path, element: <AdminProduct /> },
        { path: paths.admin.editProduct.path+"/:id", element: <EditAdminProduct /> },
        { path: paths.admin.payment.path, element: <AdminPayment /> },
        { path: paths.admin.manageUsers.path, element: <ManageUsers /> },
        { path: paths.admin.profile.path, element: <Profile /> },
        { path: paths.admin.salesReport.path, element: <SalesReport /> },
      ],
    },

    {
      path: paths.account.account.path,
      element: (
        <ProtectedRoute>
          <AccountLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          // When no child is specified, redirect to /account/address
          index: true,
          element: <Navigate to={paths.account.address.path} replace />,
        },
        {
          index: true,
          path: paths.account.address.path,
          element: <AddressList />,
        },
        {
          path: paths.account.addAddress.path,
          element: <AddAddress />,
        },
        {
          path: paths.account.orders.path,
          element: <MyOrder />,
        },
        {
          path: paths.account.personalInfo.path,
          element: <PersonalInfo />,
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
