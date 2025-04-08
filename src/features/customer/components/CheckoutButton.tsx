import axiosInstance from "@/core/axiosInstance";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface CheckoutProps {
  amount: string;
}

const Checkout: React.FC<CheckoutProps> = ({ amount }) => {
  const clientID = import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID || "";
  const merchantId = import.meta.env.VITE_REACT_APP_ADMIN_PAYPAL_EMAIL || ""
  return (
    <PayPalScriptProvider options={{ 
      clientId: clientID, 
      currency: "CAD",
      merchantId: merchantId,
       }}>
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
    </PayPalScriptProvider>
  );
};

export default Checkout;
