export const paths = {
  landing: { path: "/", getHref: () => "/" },

  auth: {
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    register: {
      path: "/auth/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    logout: { path: "/auth/logout", getHref: () => "/auth/logout" },
    confirmEmail: {
      path: "/confirm-email",
      getHref: () => "/confirm-email",
    },
  },

  store: {
    home: { path: "/store", getHref: () => "/store" },
    listing: { path: "/store/listing", getHref: () => "/store/listing" },
    productDetail: {
      path: "/store/product-details",
      getHref: () => "/store/product-details",
    },
    checkout: { path: "/checkout", getHref: () => "/checkout" },
    payment: { path: "/payment", getHref: () => "/payment" },
    checkoutSuccess: { path: "/checkout/success/:orderId", getHref: (orderId: string) => `/checkout/success/${orderId}` },
    cartPage: { path: "/cart", getHref: () => "/cart" },
  },

  vendor: {
    dashboard: {
      path: "/vendor",
      getHref: () => "/vendor",
    },
    products: { path: "/vendor/products", getHref: () => "/vendor/products" },
    addProduct: {
      path: "/vendor/products/add",
      getHref: () => "/vendor/products/add",
    },
    analytics: {
      path: "/vendor/analytics",
      getHref: () => "/vendor/analytics",
    },
    orders: { path: "/vendor/orders", getHref: () => "/vendor/orders" },
    payment: { path: "/vendor/payment", getHref: () => "/vendor/payment" },
    profile: { path: "/vendor/profile", getHref: () => "/vendor/profile" }
  },

  admin: {
    dashboard: { path: "/admin", getHref: () => "/admin" },
    product: { path: "/admin/product", getHref: () => "/admin/product" },
    order: { path: "/admin/order", getHref: () => "/admin/order" },
    editProduct: { path: "/admin/product/edit", getHref: () => "/admin/product/edit" },
    payment: { path: "/admin/payment", getHref: () => "/admin/payment" },
    manageUsers: { path: "/admin/users", getHref: () => "/admin/users" },
    profile: { path: "/admin/profile", getHref: () => "/admin/profile" },
    salesReport: { path: "/admin/sales", getHref: () => "/admin/sales" },
    deliverydays: { path: "/admin/deliverydays", getHref: () => "/admin/deliverydays" },
  },

  error: {
    notFound: { path: "*", getHref: () => "*" },
  },

  account: {
    account: {
      path: "/account",
      getHref: () => "/account/personal-info",
    },
    personalInfo: {
      path: "/account/personal-info",
      getHref: () => "/account/personal-info",
    },
    address: {
      path: "/account/address",
      getHref: () => "/account/address",
    },
    addAddress: {
      path: "/account/add-address",
      getHref: () => "/account/add-address",
    },
    editAddress: {
      path: "/account/edit-address/:id",
      getHref: (id: string) => `/account/edit-address/${id}`,
    },
    orders: {
      path: "/account/orders",
      getHref: () => "/account/orders",
    },
  },
};
