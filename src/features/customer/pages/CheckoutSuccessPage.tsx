import { Link, useParams, useLocation } from "react-router-dom";
import { paths } from "@/config/paths";
import { Button } from "@/components/ui/button";

const CheckoutSuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const paymentMethod = new URLSearchParams(location.search).get(
    "paymentMethod"
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-xl p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Checkout Successful!</h1>
        {paymentMethod === "interac" ? (
          <p className="mb-4">
            Thank you for your order. We will confirm your payment and send your
            invoice shortly.
          </p>
        ) : (
          <p className="mb-4">
            Thank you for your order. Your invoice has been sent to your email
            address.
          </p>
        )}
        <p className="mb-4">Order ID: {orderId}</p>
        <div className="flex space-x-4">
          <Button variant="default" asChild>
            <Link to={paths.store.listing.path}>Continue Shopping</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to={paths.account.orders.path}>View Order Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
