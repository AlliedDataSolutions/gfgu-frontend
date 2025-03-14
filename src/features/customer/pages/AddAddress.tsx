import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { replace, useNavigate } from "react-router-dom";
import axiosInstance from "@/core/axiosInstance";
import { paths } from "@/config/paths";
import ErrorMessage from "@/components/ui/errormessage";

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
      navigate(paths.account.address.path);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleCancel = () => {
    navigate(paths.account.address.path, { replace: true });
  };

  return (
    <div className="md:max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Add Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Row 1: Street Address */}
        <div className="flex flex-col gap-1 h-20">
          <label className="text-sm text-gray-700">Street Address</label>
          <Input
            {...register("streetName", {
              required: "Street Address is required",
            })}
            placeholder="Enter your street address"
          />
          <ErrorMessage message={errors.streetName?.message} />
        </div>

        {/* Row 2: City and Apartment/Suite/Unit */}
        <div className="flex gap-4 flex-col">
          <div className="flex-1">
            <label className="text-sm text-gray-700">City</label>
            <Input
              {...register("city", { required: "City is required" })}
              placeholder="Enter your city"
            />
            <ErrorMessage message={errors.city?.message} />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-700">
              Apartment, Suite, Unit, etc. (Optional)
            </label>
            <Input
              {...register("apartment")}
              placeholder="Enter apartment/suite/unit, etc."
            />
          </div>
        </div>

        {/* Row 3: Province and Postal Code */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1">
            <label className="text-sm text-gray-700">Province</label>
            <Input
              {...register("province", { required: "Province is required" })}
              placeholder="Enter your province"
            />
            <ErrorMessage message={errors.province?.message} />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-700">Postal Code</label>
            <Input
              {...register("postalCode", {
                required: "Postal Code is required",
              })}
              placeholder="Enter your postal code"
            />
            <ErrorMessage message={errors.postalCode?.message} />
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
          />
          <ErrorMessage message={errors.email?.message} />
        </div>

        {/* Row 5: Buttons (placed at bottom right) */}
        <div className="flex justify-end gap-6 mt-4">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
