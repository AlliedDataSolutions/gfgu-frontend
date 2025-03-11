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

export const sampleProduct = Array(8).fill({
  id: "f8fecbc2-a3ac-498f-9738-5e0696e273f8",
  name: "Garri",
  description: "Bag of garri available",
  price: 59.99,
  stockLevel: 20,
  createdDate: new Date("2025-03-08T01:35:54.659Z"),
  modifeidDate: new Date("2025-03-08T01:35:54.659Z"),
  //vendor
  //images: [],
  //categories: []
});
