import { AddressLabel, AddressType } from "@/core/AddressType";
import React from "react";

interface Address {
  id: string;
  addressType: AddressType;
  streetName: string;
  town: string;
  province: string;
  postalCode: string;
  createdDate: string;
  modifiedDate: string;
}

interface AddressCardProps {
  address: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  const addressLabel = AddressLabel(address.addressType);

  return (
    <div className="bg-white p-6 mb-4 md:mb-0">
      <h3 className="text-base leading-6 font-medium text-gray-900">
        {addressLabel}
      </h3>
      <div className="mt-2 text-sm text-gray-500">
        <p>{address.streetName}</p>
        <p>
          {address.town}, {address.province} {address.postalCode}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
