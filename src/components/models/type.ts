export interface ProductCategory {
  id: string;
  name: string;
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
  // images;
  // categories;
}

export interface Vendor {
  id: string;
  businessName: string;
  businessDescription: string;
}
