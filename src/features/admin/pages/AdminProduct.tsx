import { paths } from "@/config/paths";
import { Navigate } from "react-router-dom";

export function AdminProduct() {
  return <Navigate to={paths.vendor.products.getHref()} replace />;
}