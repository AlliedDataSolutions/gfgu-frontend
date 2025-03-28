import { AddressType } from '@/core/AddressType';
import React from 'react';

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
    return (
        <div className="border rounded p-4">
            <h3 className="text-lg font-semibold">{address.addressType} Address</h3>
            <p>{address.streetName}</p>
            <p>{address.town}, {address.province} {address.postalCode}</p>
        </div>
    );
};

export default AddressCard;
