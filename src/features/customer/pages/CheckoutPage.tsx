import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { paths } from "@/config/paths";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import ErrorMessage from "@/components/ui/errormessage";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  additionalInfo?: string;
  paymentMethod: string;
  saveInfo?: boolean;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [serverError, setServerError] = useState("");

  // Initialize form with default values.
  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "Lethbridge",
      province: "Alberta",
      postalCode: "",
      phoneNumber: "",
      additionalInfo: "",
      paymentMethod: "interac",
      saveInfo: false,
    },
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Replace this with your actual API call if available.
        // const response = await axiosInstance.get("/cart");
        // setCartItems(response.data.items);

        // For now, use mock data:
        const mockItems = [
          { id: "1", name: "Brown Beans", quantity: 1, price: 200 },
          { id: "2", name: "Brown Beans", quantity: 2, price: 200 },
        ];
        setCartItems(mockItems);
        const subtotal = mockItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setCartSubtotal(subtotal);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };
    fetchCart();
  }, []);

  const onSubmit = async (data: CheckoutFormValues) => {
    setServerError("");
    try {
      // Call your backend endpoint using axiosInstance
      const response = await axiosInstance.post("/address", data);
      console.log("Checkout response:", response.data);
      alert("Checkout data submitted successfully!");
    } catch (error) {
      handleAxiosError(error);
      setServerError("Failed to submit checkout data. Please try again later.");
    }
  };

  return (
    <>
      <Header menuItems={[]} />
      <div className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="pt-20 pb-6 container max-w-screen-xl mx-auto px-4">
          <nav className="text-sm text-gray-600 flex items-center gap-2">
            <Link to={paths.store.listing.getHref()} className="hover:underline">
              Shop
            </Link>
            <span>/</span>
            <Link to={paths.store.cartPage.getHref()} className="hover:underline">
              Cart
            </Link>
            <span>/</span>
            <span className="font-bold">Check Out</span>
          </nav>
        </div>

        {serverError && <ErrorMessage message={serverError} />}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="container max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row gap-8">
            {/* Left column: Shipping Address and Payment Method */}
            <div className="flex-1 space-y-6">
              {/* Shipping Address Form */}
              <div className="p-4 md:p-6 rounded-md space-y-4">
                <h2 className="text-2xl font-semibold text-green-900">Shipping Address</h2>

                {/* First and Last Name Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="John" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{ required: "Last name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" placeholder="Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Street Address */}
                <FormField
                  control={form.control}
                  name="addressLine1"
                  rules={{ required: "Street address is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="123 Main St" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Apartment, Suite, etc. */}
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apt, Suite, etc. (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Apt 4B" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City Dropdown */}
                <FormField
                  control={form.control}
                  name="city"
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Lethbridge">Lethbridge</SelectItem>
                            <SelectItem value="Edmonton">Edmonton</SelectItem>
                            <SelectItem value="Calgary">Calgary</SelectItem>
                            <SelectItem value="Airdrie">Airdrie</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Province Dropdown */}
                <FormField
                  control={form.control}
                  name="province"
                  rules={{ required: "Province is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Alberta">Alberta</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Postal Code */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  rules={{
                    required: "Postal code is required",
                    pattern: {
                      value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                      message: "Invalid postal code format (e.g. T1K 1T6)",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code (e.g. T1K 1T6)</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="T1K 1T6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  }}
                  
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="4031234567" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional Information */}
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Gate code, delivery note..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Save this information */}
                <FormField
                  control={form.control}
                  name="saveInfo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(val) => field.onChange(Boolean(val))} />
                      </FormControl>
                      <FormLabel className="text-sm">Save this information for future use</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment Method */}
              <div className="p-4 md:p-6 rounded-md space-y-4">
                <h2 className="text-xl font-semibold text-green-900">Payment Method</h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      {/* Display options vertically */}
                      <RadioGroup value={field.value} onValueChange={(val) => field.onChange(val)} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="interac" id="interac" />
                          <label htmlFor="interac" className="text-sm">Interac</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <label htmlFor="paypal" className="text-sm">Paypal</label>
                        </div>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800">
                  Pay Now
                </Button>
              </div>
            </div>

            {/* Right column: Order Summary */}
            <div className="w-full md:w-[350px] lg:w-[400px] space-y-4">
              <div className="bg-gray-50 p-4 md:p-6 rounded-md">
                <h2 className="text-xl font-semibold text-green-900 mb-4">Your Order</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded" />
                      )}
                      <p>{item.name} x {item.quantity}</p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between py-1">
                  <span>Subtotal:</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <Footer menuItems={[
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Delivery Days", href: "/delivery" },
        { name: "Contact", href: "/contact" },
      ]} />
    </>
  );
}
