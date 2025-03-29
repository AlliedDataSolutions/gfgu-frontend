import axiosInstance from "@/core/axiosInstance";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface CheckoutProps {
  amount: string;
}

const Checkout: React.FC<CheckoutProps> = ({ amount }) => {
  const clientID = import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID || "";
  return (
    <PayPalScriptProvider options={{ clientId: clientID }}>
      <PayPalButtons
        createOrder={async () => {
          const res = await axiosInstance.post("/api/paypal/create-order", {
            amount,
          });
          return res.data.id;
        }}
        onApprove={async (data) => {
          const res = await axiosInstance.post("/api/paypal/capture-payment", {
            orderID: data.orderID,
          });
          console.log("Payment successful", res.data);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Checkout;
