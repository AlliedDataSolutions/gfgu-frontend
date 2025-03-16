import { Role } from "./role";

export interface Vendor {
  id: string;
  businessName: string;
  vendor: Vendor;
}


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  vendor: Vendor;
  phoneNumber?: string;
  createdDate: Date;
  modifiedDate: Date;
}
