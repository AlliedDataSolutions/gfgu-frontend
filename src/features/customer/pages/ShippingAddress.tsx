import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import LandingHeader from "@/features/common/components/LandingHeader";
import Footer from "@/components/ui/footer";

export function ShippingAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Call endpoint from backend
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/address/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save address");
      console.log("Address saved!");
    } catch (error) {
      console.error(error);
    }
  };
  

  // Mock cart items for the "Your Order" section
  const cartItems = [
    { id: 1, name: "Brown Beans x 1", price: 200 },
    { id: 2, name: "Brown Beans x 2", price: 200 },
  ];

  const subtotal = 400;
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Nav Bar / Header */}
      <LandingHeader
        menuItems={[
          { name: "Home", href: "/" },
          { name: "About", href: "/#about" },
          { name: "Delivery Days", href: "/#deliveryDays" },
          { name: "Contact", href: "/#contact" },
        ]}
      />

      {/* Breadcrumb (Shop / Cart / Check Out) */}
      <div className="max-w-7xl w-full mx-auto px-4 mt-4">
        <nav className="text-sm text-neutral-600 flex items-center space-x-2">
          <span>Shop</span>
          <span>/</span>
          <span>Cart</span>
          <span>/</span>
          <span className="text-neutral-900 font-semibold">Check Out</span>
        </nav>
      </div>

      {/* Main content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-7xl w-full mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8"
      >
        {/* Left column: Shipping & Payment */}
        <div className="flex-1 flex flex-col space-y-8">
          {/* Shipping Address Section */}
          <div>
            <h2 className="text-3xl font-semibold text-brand-900 mb-6">
              Shipping Address
            </h2>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm text-neutral-900 mb-2">
                Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  Full Name is required
                </p>
              )}
            </div>

            {/* Street Address */}
            <div className="mb-4">
              <label className="block text-sm text-neutral-900 mb-2">
                Street Address
              </label>
              <Input
                placeholder="Apartment, Suite, Unit, etc. (Optional)"
                {...register("streetAddress", { required: true })}
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm mt-1">
                  Street Address is required
                </p>
              )}
            </div>

            {/* City */}
            <div className="mb-4">
              <label className="block text-sm text-neutral-900 mb-2">
                City
              </label>
              <Input
                placeholder="Enter your city"
                {...register("city", { required: true })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">City is required</p>
              )}
            </div>

            {/* Province */}
            <div className="mb-4">
              <label className="block text-sm text-neutral-900 mb-2">
                Province
              </label>
              <Input
                placeholder="Select your province"
                {...register("province", { required: true })}
              />
              {errors.province && (
                <p className="text-red-500 text-sm mt-1">
                  Province is required
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div className="mb-4">
              <label className="block text-sm text-neutral-900 mb-2">
                Postal Code
              </label>
              <Input
                placeholder="Enter your postal code"
                {...register("postalCode", { required: true })}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">
                  Postal Code is required
                </p>
              )}
            </div>

            {/* Additional Information */}
            <div className="mb-4">
              <label className="block text-sm text-neutral-900 mb-2">
                Additional Information (Optional)
              </label>
              <Input
                placeholder="Notes about your order, special notes for delivery..."
                {...register("additionalInfo")}
              />
            </div>

            {/* Checkbox: Email Subscription */}
            <div className="flex items-center mb-4">
              <Checkbox
                id="receiveEmails"
                {...register("receiveEmails")}
                className="mr-2"
              />
              <label htmlFor="receiveEmails" className="text-base text-neutral-900">
                I want to receive emails about product updates, features, and promotions.
              </label>
            </div>
          </div>

          {/* Payment Method Section */}
          <div>
            <h2 className="text-3xl font-semibold text-brand-900 mb-6">
              Payment Method
            </h2>

            <RadioGroup
              defaultValue="paypal"
              className="flex flex-col gap-4"
              {...register("paymentMethod")}
            >
              {/* Example #1: PayPal */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="paypal"
                  value="paypal"
                  disabled={false}
                />
                <label htmlFor="paypal" className="text-base text-neutral-900">
                  Paypal
                </label>
              </div>

              {/* Example #2: Interac */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  id="interac"
                  value="interac"
                  disabled={false}
                />
                <label htmlFor="interac" className="text-base text-neutral-900">
                  Interac
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* "Pay Now" Button */}
          <Button type="submit" variant="default" className="bg-brand-700 text-white w-full md:w-auto mt-4">
            Pay Now
          </Button>
        </div>

        {/* Right column: Order Summary */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-neutral-50 p-4 md:p-6 rounded-md">
          <h2 className="text-3xl font-semibold text-brand-900 mb-6">
            Your Order
          </h2>

          {/* Cart items */}
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {/* Example image placeholder */}
                <div className="w-12 h-12 bg-green-100 rounded-md" />
                <p className="text-base text-neutral-900">{item.name}</p>
              </div>
              <p className="text-base text-neutral-900">${item.price}</p>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex items-center justify-between border-t border-neutral-300 pt-2 mt-4">
            <p className="text-base text-neutral-900">Subtotal:</p>
            <p className="text-base text-neutral-900">${subtotal}</p>
          </div>

          {/* Shipping */}
          <div className="flex items-center justify-between border-b border-neutral-300 pb-2 mb-2">
            <p className="text-base text-neutral-900">Shipping:</p>
            <p className="text-base text-neutral-900">
              {shippingCost === 0 ? "Free" : `$${shippingCost}`}
            </p>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-neutral-900">Total:</p>
            <p className="text-base font-semibold text-neutral-900">${total}</p>
          </div>
        </div>
      </form>

      {/* Footer */}
      <Footer
        menuItems={[
          { name: "Home page", href: "/" },
          { name: "About", href: "/#about" },
          { name: "Delivery Days", href: "/#deliveryDays" },
          { name: "Contact", href: "/#contact" },
        ]}
      />
    </div>
  );
}

export default ShippingAddress;
