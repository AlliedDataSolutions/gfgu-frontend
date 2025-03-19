import { Product } from "@/components/models/type";

export interface OrderLine {
  id: string;
  quantity: number;
  unitPrice: string;
  product: Product;
}

export interface Order {
  id: string;
  orderDate: string;
  requiredDate: string | null;
  shippedDate: string | null;
  status: string;
  orderLines: OrderLine[];
}
