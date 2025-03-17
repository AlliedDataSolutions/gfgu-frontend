export interface ProductCategory {
  id: string;
  type: string;
  imageUrl: string;
  description?: string;
}

export interface ImageType {
  id: string;
  url: string;
  file?: File;
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
}

export interface Vendor {
  id: string;
  businessName: string;
  businessDescription: string;
}
