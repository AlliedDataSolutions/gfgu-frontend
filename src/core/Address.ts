import { AddressType } from "./AddressType";

export interface Address {
  id: string;
  addressType: AddressType;
  streetName: string;
  apartment?: string;
  phoneNumber?: string;
  town: string;
  province: string;
  postalCode: string;
  createdDate: string;
  modifiedDate: string;
}
