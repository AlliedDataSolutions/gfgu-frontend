import { AddressLabel } from "@/core/AddressType";
import React from "react";
import { Address } from "@/core/Address";

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onAddressSelected: (id: string) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onAddressSelected,
}) => {
  const addressLabel = AddressLabel(address.addressType); // Type assertion not needed

  return (
    <div className="bg-white p-6 mb-4 md:mb-0">
      <label className="flex items-center">
        <input
          type="radio"
          className="form-radio h-5 w-5 text-brand-600"
          value={address.id}
          checked={isSelected}
          onChange={() => onAddressSelected(address.id)}
        />
        <div className="ml-2">
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
      </label>
    </div>
  );
};

export default AddressCard;
