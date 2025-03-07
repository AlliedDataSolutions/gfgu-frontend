import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/core/axiosInstance";

interface AddAddressFormInputs {
  streetName: string;
  city: string;
  apartment?: string;
  province: string;
  postalCode: string;
  email: string;
}

export default function AddAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAddressFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AddAddressFormInputs> = async (data) => {
    try {
      // Call the API to save the address
      const res = await axiosInstance.post("/address", data);
      console.log("Address saved:", res.data);
      // Redirect back to the address list
      navigate("/account/address");
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleCancel = () => {
    navigate("/account/address");
  };

  return (
    <div className="max-w-[867px] mx-auto">
      <h2 className="text-xl font-semibold mb-6">Add Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Row 1: Street Address */}
        <div className="flex flex-col gap-1 h-20">
          <label className="text-sm text-gray-700">Street Address</label>
          <Input
            {...register("streetName", { required: "Street Address is required" })}
            placeholder="Enter your street address"
            className="w-full h-14"
          />
          {errors.streetName && (
            <span className="text-red-500 text-xs">{errors.streetName.message}</span>
          )}
        </div>

        {/* Row 2: City and Apartment/Suite/Unit */}
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-1 w-1/2 h-20">
            <label className="text-sm text-gray-700">City</label>
            <Input
              {...register("city", { required: "City is required" })}
              placeholder="Enter your city"
              className="w-full h-14"
            />
            {errors.city && (
              <span className="text-red-500 text-xs">{errors.city.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-1/2 h-20">
            <label className="text-sm text-gray-700">
              Apartment, Suite, Unit, etc. (Optional)
            </label>
            <Input
              {...register("apartment")}
              placeholder="Enter apartment/suite/unit, etc."
              className="w-full h-14"
            />
          </div>
        </div>

        {/* Row 3: Province and Postal Code */}
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-1 w-1/2 h-20">
            <label className="text-sm text-gray-700">Province</label>
            <Input
              {...register("province", { required: "Province is required" })}
              placeholder="Enter your province"
              className="w-full h-14"
            />
            {errors.province && (
              <span className="text-red-500 text-xs">{errors.province.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-1/2 h-20">
            <label className="text-sm text-gray-700">Postal Code</label>
            <Input
              {...register("postalCode", { required: "Postal Code is required" })}
              placeholder="Enter your postal code"
              className="w-full h-14"
            />
            {errors.postalCode && (
              <span className="text-red-500 text-xs">{errors.postalCode.message}</span>
            )}
          </div>
        </div>

        {/* Row 4: Email Address */}
        <div className="flex flex-col gap-1 h-20">
          <label className="text-sm text-gray-700">Email Address</label>
          <Input
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email address"
            className="w-full h-14"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        {/* Row 5: Buttons (placed at bottom right) */}
        <div className="flex justify-end gap-6 mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-[193px] h-14"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default" className="w-[193px] h-14">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
