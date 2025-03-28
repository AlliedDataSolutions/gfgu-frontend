import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { menuItems, storeMenuItems } from "@/core/data";
import useAddress from "../../customer/hooks/useAddress";
import AddressCard from "../../customer/components/AddressCard";
import AddAddress from "../../customer/pages/AddAddress";
import { Button } from "@/components/ui/button";
import { OrderSummary } from "../components/OrderSummary";
import { useState } from "react";

export default function CheckoutPage() {
  const { addresses, loading, showAddressForm, toggleAddressForm } =
    useAddress();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  if (loading) {
    return <div>Loading addresses...</div>;
  }

  const handleAddressSelected = (id: string) => {
    setSelectedAddressId(id);
  };

  return (
    <>
      <div className="pt-14 md:pt-16">
        <Header menuItems={storeMenuItems} />
      </div>

      <div className="container mx-auto p-4">
        {showAddressForm ? (
          <div className="p-8">
            <AddAddress />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-items-center w-full ">
            <div className="mt-4">
              <Button variant={"link"} onClick={toggleAddressForm} className="text-blue-400 p-4">
                {showAddressForm ? "Show Address List" : "Add New Address"}
              </Button>
              {addresses.length === 0 ? (
                <div>No addresses found.</div>
              ) : (
                addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={address.id === selectedAddressId}
                    onAddressSelected={handleAddressSelected}
                  />
                ))
              )}
            </div>
            <OrderSummary />
          </div>
        )}
      </div>

      <Footer menuItems={menuItems} />
    </>
  );
}
