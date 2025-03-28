export enum AddressType {
  billing = "billing",
  shipping = "shipping",
  isUserAddress = "isUserAddress",
}

export const AddressLabel = (addressType: AddressType) => {
  switch (addressType) {
    case AddressType.billing:
      return "Billing";
    case AddressType.shipping:
      return "Shipping";
    case AddressType.isUserAddress:
      return "Home Address";
    default:
      break;
  }
};
