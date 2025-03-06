import { Role } from "./role";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  phoneNumber?: string;
  createdDate: Date;
  modifiedDate: Date;
}
