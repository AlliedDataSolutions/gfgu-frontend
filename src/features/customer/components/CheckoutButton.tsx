import axiosInstance from "@/core/axiosInstance";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const Checkout = ({ amount }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
      <PayPalButtons
        createOrder={async () => {
          const res = await axiosInstance.post("/api/paypal/create-order", { amount });
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
