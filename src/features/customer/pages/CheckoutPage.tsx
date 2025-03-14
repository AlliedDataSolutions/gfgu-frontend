import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";  // if you have a helper
import ErrorMessage from "@/components/ui/errormessage";     // your error component

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

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [serverError, setServerError] = useState(""); // For displaying any server error

  // Set up react-hook-form
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
      paymentMethod: "cod",
      saveInfo: false,
    },
  });

  // Simulate or fetch cart items from an API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // If your back end has a cart endpoint, you might do:
        // const response = await axiosInstance.get("/cart");
        // setCartItems(response.data.items);

        // For now, mock data:
        const mockItems = [
          { id: "1", name: "Brown Beans", quantity: 1, price: 200 },
          { id: "2", name: "Brown Beans", quantity: 2, price: 200 },
        ];
        setCartItems(mockItems);

        // Calculate subtotal
        let sum = 0;
        mockItems.forEach((item) => {
          sum += item.price * item.quantity;
        });
        setCartSubtotal(sum);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    fetchCart();
  }, []);

  // Handle form submission
  const onSubmit = async (data: CheckoutFormValues) => {
    setServerError(""); // Reset any previous server error

    try {
      // Example: call a shipping address endpoint in your back end
      const response = await axiosInstance.post("/address/shipping", data);
      console.log("Checkout response:", response.data);

      // If successful, do something:
      alert("Checkout data submitted successfully!");
    } catch (error) {
      // Use your handleAxiosError or manually set serverError
      handleAxiosError(error);
      setServerError("Failed to submit checkout data. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="pt-20 pb-6 container max-w-screen-xl mx-auto px-4">
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          <Link to={paths.landing.getHref()} className="hover:underline">
            Shop
          </Link>
          <span>/</span>
          <Link to={paths.store.cartPage.getHref()} className="hover:underline">
            Cart
          </Link>
          <span>/</span>
          <span>Check Out</span>
        </nav>
      </div>

      {/* Optional error message if there's a serverError */}
      {serverError && <ErrorMessage message={serverError} />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row gap-8"
        >
          {/* Left column: Shipping Address and Payment Method */}
          <div className="flex-1 space-y-6">
            {/* Shipping Address */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-md space-y-4">
              <h2 className="text-xl font-semibold text-green-900">Shipping Address</h2>

              {/* FIRST & LAST NAME (side by side) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
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

                {/* Last Name */}
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

              {/* Address Line 1 */}
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

              {/* Address Line 2 (optional) */}
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apartment, Suite, Unit, etc. (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Apt 4B" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(val) => field.onChange(val)}
                      >
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

              {/* Province (only Alberta) */}
              <FormField
                control={form.control}
                name="province"
                rules={{ required: "Province is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(val) => field.onChange(val)}
                      >
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
                    value: /^[0-9]+$/,
                    message: "Phone number must be digits only",
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

              {/* Additional Info (optional) */}
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

              {/* Save Info */}
              <FormField
                control={form.control}
                name="saveInfo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(val) => field.onChange(Boolean(val))}
                      />
                    </FormControl>
                    <FormLabel className="text-sm">
                      Save this information for future use
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-md space-y-4">
              <h2 className="text-xl font-semibold text-green-900">Payment Method</h2>

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <label htmlFor="cod" className="text-sm">COD</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="interac" id="interac" />
                        <label htmlFor="interac" className="text-sm">Interac</label>
                      </div>
                    </RadioGroup>
                  </FormItem>
                )}
              />

              {/* Pay Now Button */}
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
                    {/* If you have an image, show it here */}
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

              {/* Subtotal */}
              <div className="flex justify-between py-1">
                <span>Subtotal:</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {/* Shipping (mock) */}
              <div className="flex justify-between py-1">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr className="my-4" />
              {/* Total */}
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
