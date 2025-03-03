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
  },

  customer: {
    home: { path: "/home", getHref: () => "/home" },
    checkout: { path: "/checkout", getHref: () => "/checkout" },
    payment: { path: "/payment", getHref: () => "/payment" },
    shipping: { path: "/checkout/shipping", getHref: () => "/checkout/shipping" }, 
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
  },

  admin: {
    dashboard: { path: "/admin", getHref: () => "/admin" },
    manageUsers: { path: "/admin/users", getHref: () => "/admin/users" },
    salesReport: { path: "/admin/sales", getHref: () => "/admin/sales" },
  },
  
  days: {
    delivery: { path: "/delivery", getHref: () => "/delivery" },
  },
  error: {
    notFound: { path: "*", getHref: () => "*" },
  },
};
