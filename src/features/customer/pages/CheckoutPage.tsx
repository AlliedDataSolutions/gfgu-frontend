import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { menuItems, storeMenuItems } from "@/core/data";
import { useCartContext } from "@/features/store/hooks/CartContext";
import { OrderLine } from "@/core/order";

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

const total = (orderLines?: OrderLine[]) => {
  return orderLines
    ?.reduce(
      (sum, orderLine) =>
        sum + Number(orderLine.unitPrice) * orderLine.quantity,
      0
    )
    .toFixed(2);
};

export default function CheckoutPage() {
  const { order } = useCartContext();

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

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      // Call your backend endpoint using axiosInstance
      await axiosInstance.post("/address", data);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <>
      <div className="pt-14 md:pt-16">
        <Header menuItems={storeMenuItems} />
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto px-4 flex flex-col md:flex-row gap-8"
            >
              {/* Left column: Shipping Address and Payment Method */}
              <div className="flex-1 space-y-6 max-w-3xl">
                {/* Shipping Address Form */}
                <div className="p-4 md:p-6 rounded-md space-y-4">
                  <h2 className="text-2xl font-medium text-brand-900">
                    Shipping Address
                  </h2>

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
                          <Input
                            {...field}
                            type="text"
                            placeholder="123 Main St"
                          />
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
                          <Select
                            value={field.value}
                            onValueChange={(val) => field.onChange(val)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Lethbridge">
                                Lethbridge
                              </SelectItem>
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
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be exactly 10 digits",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="4031234567"
                          />
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
                          <Input
                            {...field}
                            type="text"
                            placeholder="Gate code, delivery note..."
                          />
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
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(val) =>
                              field.onChange(Boolean(val))
                            }
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
                <div className="p-4 md:p-6 rounded-md space-y-4">
                  <h2 className="text-xl font-medium text-brand-900">
                    Payment Method
                  </h2>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        {/* Display options vertically */}
                        <RadioGroup
                          value={field.value}
                          onValueChange={(val) => field.onChange(val)}
                          className="flex flex-col gap-4"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="interac" id="interac" />
                            <label htmlFor="interac" className="text-sm">
                              Interac
                            </label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <label htmlFor="paypal" className="text-sm">
                              Paypal
                            </label>
                          </div>
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Pay Now
                  </Button>
                </div>
              </div>

              {/* Right column: Order Summary */}
              <div className="w-full md:w-[350px] lg:w-[400px] space-y-4">
                <div className="bg-neutral-50 p-4 md:p-6 rounded-md">
                  <h2 className="text-xl font-medium text-brand-900 mb-4">
                    Your Order
                  </h2>
                  {order?.orderLines.map((orderLine) => (
                    <div
                      key={orderLine.id}
                      className="flex items-center justify-between mb-2"
                    >
                      <div className="flex items-center gap-2">
                        {orderLine.product.images[0]?.url ? (
                          <img
                            src={orderLine.product.images[0].url}
                            alt={orderLine.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-neutral-300 rounded" />
                        )}
                        <p>
                          {orderLine.product.name} x {orderLine.quantity}
                        </p>
                      </div>
                      <p>
                        $
                        {(
                          Number(orderLine.unitPrice) * orderLine.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <hr className="my-4" />
                  <div className="flex justify-between py-1 text-sm">
                    <span>Subtotal:</span>
                    <span>${total(order?.orderLines)}</span>
                  </div>
                  <div className="flex justify-between py-1  text-sm">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between font-medium  text-sm">
                    <span>Total:</span>
                    <span>${total(order?.orderLines)}</span>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <Footer menuItems={menuItems} />
      </div>
    </>
  );
}
