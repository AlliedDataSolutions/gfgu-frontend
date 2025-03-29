import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { menuItems, storeMenuItems } from "@/core/data";
import useAddress from "../../customer/hooks/useAddress";
import AddressCard from "../../customer/components/AddressCard";
import AddAddress from "../../customer/pages/AddAddress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Checkout from "@/features/customer/components/CheckoutButton";
import { useCartContext } from "@/features/store/hooks/CartContext"; // Import useCartContext
import { OrderSummary } from "../components/OrderSummary";
import { OrderLine } from "@/core/order";
import InlineLoader from "@/components/ui/inlineloading";

const total = (orderLines?: OrderLine[]) => {
  return orderLines
    ?.reduce(
      (sum, orderLine) =>
        sum + Number(orderLine.unitPrice) * orderLine.quantity,
      0
    )
    .toFixed(2);
};

export default function CheckoutPage() {
  const { addresses, loading, showAddressForm, toggleAddressForm } =
    useAddress();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const { order } = useCartContext();

  if (loading) {
    return <InlineLoader loading={loading} children={undefined} />;
  }

  const handleAddressSelected = (id: string) => {
    setSelectedAddressId(id);
  };

  const totalAmount = total(order?.orderLines);

  return (
    <>
      <div className="pt-14 md:pt-16">
        <Header menuItems={storeMenuItems} />
      </div>

      <div className="container mx-auto p-4">
        <h2 className="text-xl font-medium text-brand-900 mb-4">Checkout</h2>
        {showAddressForm ? (
          <div className="p-8">
            <AddAddress />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:justify-items-center w-full">
            <div className="mt-4 order-2 lg:order-1">
              <Button
                variant={"link"}
                onClick={toggleAddressForm}
                className="text-blue-400 p-4"
              >
                {showAddressForm ? "Show Address List" : "Add New Address"}
              </Button>
              <div className="mb-4">
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
              <Checkout amount={totalAmount || "0"} />
            </div>
            <div className="order-1 lg:order-2">
              <OrderSummary
                order={order || undefined}
                totalAmount={totalAmount || "0"}
              />
            </div>
          </div>
        )}
      </div>

      <Footer menuItems={menuItems} />
    </>
  );
}
