import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { paths } from '@/config/paths';

const CheckoutSuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const paymentMethod = new URLSearchParams(location.search).get('paymentMethod');

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Checkout Successful!</h1>
      {paymentMethod === 'interac' ? (
        <p className="mb-4">
          Thank you for your order. We will confirm your payment and send your invoice shortly.
        </p>
      ) : (
        <p className="mb-4">
          Thank you for your order. Your invoice has been sent to your email address.
        </p>
      )}
      <p className="mb-4">
        Order ID: {orderId}
      </p>
      <div className="flex space-x-4">
        <Link to={paths.store.listing.path} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Continue Shopping
        </Link>
        <Link to={paths.account.orders.path} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          View Order Details
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
