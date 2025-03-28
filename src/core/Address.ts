import { AddressType } from "./AddressType";

export interface Address {
  id: string;
  addressType: AddressType;
  streetName: string;
  town: string;
  province: string;
  postalCode: string;
  createdDate: string;
  modifiedDate: string;
}
