import axiosInstance from "@/core/axiosInstance";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface CheckoutProps {
  amount: string;
  selectedAddressId?: string | null;
}

const Checkout: React.FC<CheckoutProps> = ({ amount, selectedAddressId }) => {
  const clientID = import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID || "";
  const merchantId = import.meta.env.VITE_REACT_APP_ADMIN_PAYPAL_EMAIL || "";

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientID,
        currency: "CAD",
        merchantId: merchantId,
      }}
    >
      {selectedAddressId ? (
        <PayPalButtons
          createOrder={async () => {
            const res = await axiosInstance.post("/payment/init", {
              amount,
            });
            return res.data.id;
          }}
          onApprove={async (data) => {
            const res = await axiosInstance.post("/payment/capture-payment", {
              orderID: data.orderID,
            });
            console.log("Payment successful", res.data);
          }}
        />
      ) : (
        <div className="text-rose-300">Please select an address to proceed</div>
      )}
    </PayPalScriptProvider>
  );
};

export default Checkout;
