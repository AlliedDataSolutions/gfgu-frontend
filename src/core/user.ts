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
  isConfirmed?: boolean;
  role: Role;
  vendor: Vendor;
  phoneNumber?: string;
  createdDate: Date;
  modifiedDate: Date;
  vendor?: {
    status: ConfirmationStatus;
  } | null;
}

//Vendor confirmation Status
export enum ConfirmationStatus {
  pending = "pending",
  confirmed = "confirmed",
  unconfirmed = "unconfirmed",
  suspended = "suspended",
}
