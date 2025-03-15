export interface ProductCategory {
  id: string;
  type: string;
  imageUrl: string;
  description?: string;
}

export interface ImageType {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  stockLevel: number;
  price: number;
  vendor: Vendor;
  createdDate: Date;
  modifeidDate: Date;
  images: ImageType[];
  categories: ProductCategory[];
  quantity?: number;
}

export interface Vendor {
  id: string;
  businessName: string;
  businessDescription: string;
}

export interface CartProducts  extends Product {
  quantity: number;
}

export interface CartType {
  cartId: string;
  product: CartProducts[];
}
