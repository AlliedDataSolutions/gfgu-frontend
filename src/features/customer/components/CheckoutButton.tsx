import axiosInstance from "@/core/axiosInstance";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { Button } from "@/components/ui/button";

interface CheckoutProps {
  amount: string;
  orderId: string;
  selectedAddressId?: string | null;
}

const Checkout: React.FC<CheckoutProps> = ({
  amount,
  orderId,
  selectedAddressId,
}) => {
  const clientID = import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID || "";
  const merchantId = import.meta.env.VITE_REACT_APP_ADMIN_PAYPAL_EMAIL || "";
  const [paymentMethod, setPaymentMethod] = useState("paypal"); // Default to Interac
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-xl">
      <RadioGroup
        className="mb-4"
        defaultValue="paypal"
        onValueChange={setPaymentMethod}
      >
        <Label className="flex items-center space-x-2" htmlFor="interac">
          <RadioGroupItem value="interac" id="interac" />
          <span>Interac</span>
        </Label>
        <Label className="flex items-center space-x-2" htmlFor="paypal">
          <RadioGroupItem value="paypal" id="paypal" />
          <span>PayPal</span>
        </Label>
      </RadioGroup>
      {selectedAddressId ? (
        paymentMethod === "interac" ? (
          <Button
            className="w-full"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                await axiosInstance.post("/payment/offline-pay", {
                  amount,
                });
                toast.success(
                  "We will review your payment. You can track your order in your profile"
                );
                navigate(paths.store.home.path);
              } catch (error) {
                handleAxiosError(error);
              } finally {
                setLoading(false);
              }
            }}
          >
            I have paid
          </Button>
        ) : (
          <PayPalScriptProvider
            options={{
              clientId: clientID,
              dataNamespace: "paypal_sdk",
              currency: "CAD",
              merchantId: merchantId,
            }}
          >
            <PayPalButtons
              createOrder={async () => {
                const res = await axiosInstance.post("/payment/init", {
                  orderId: orderId,
                  selectedAddressId: selectedAddressId,
                });
                return res.data.id;
              }}
              onApprove={async (data) => {
                try {
                  await axiosInstance.post("/payment/capture-payment", {
                    paypalOrderId: data.orderID,
                  });
                  toast.success(
                    "Payment captured, track your order in your profile"
                  );
                  navigate(paths.store.home.path);
                } catch (error) {
                  handleAxiosError(error);
                }
              }}
            />
          </PayPalScriptProvider>
        )
      ) : (
        <div className="text-rose-500">Please select an address to proceed</div>
      )}
    </div>
  );
};

export default Checkout;
