// src/features/customer/pages/AddAddress.tsx
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAddress from "../hooks/useAddress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import InlineLoader from "@/components/ui/inlineloading";
import ErrorMessage from "@/components/ui/errormessage";
import { handleAxiosError } from "@/lib/handleAxiosError";

interface FormInputs {
  streetName: string;
  city: string;
  apartment?: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
}

// Format phone as (123) 456-7890
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 10);
  if (digits.length <= 3) return `(${part1}`;
  if (digits.length <= 6) return `(${part1}) ${part2}`;
  return `(${part1}) ${part2}-${part3}`;
}

export default function AddAddress() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addresses, addAddress, updateAddress, loading } = useAddress();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      streetName: "",
      city: "",
      apartment: "",
      province: "Alberta",
      postalCode: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (id && addresses.length) {
      const existing = addresses.find((a) => a.id === id);
      if (existing) {
        setValue("streetName", existing.streetName);
        setValue("city", existing.town);
        setValue("apartment", existing.apartment || "");
        setValue("province", existing.province);
        setValue("postalCode", existing.postalCode);
        setValue("phoneNumber", existing.phoneNumber || "");
      }
    }
  }, [id, addresses, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      if (id) await updateAddress(id, data);
      else await addAddress(data);
      navigate("/account/address");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <InlineLoader loading={loading}>
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {id ? "Edit Address" : "Add New Address"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Street Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-700">
              Street Address <span className="text-xs text-neutral-500">e.g. 123 Main St</span>
            </label>
            <Input
              {...register("streetName", { required: "Street Address is required" })}
              placeholder="Enter street address"
            />
            <ErrorMessage message={errors.streetName?.message} />
          </div>

          {/* City & Apartment */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-neutral-700">
                City <span className="text-xs text-neutral-500">e.g. Calgary</span>
              </label>
              <Input
                list="city-list"
                {...register("city", { required: "City is required" })}
                placeholder="Enter or select city"
              />
              <datalist id="city-list">
                <option value="Edmonton" />
                <option value="Calgary" />
                <option value="Lethbridge" />
                <option value="Airdrie" />
              </datalist>
              <ErrorMessage message={errors.city?.message} />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-neutral-700">
                Apt, Suite, Unit (optional) <span className="text-xs text-neutral-500">e.g. Apt 4B</span>
              </label>
              <Input {...register("apartment")} placeholder="Apartment, suite, etc." />
            </div>
          </div>

          {/* Province & Postal Code */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-neutral-700">
                Province <span className="text-xs text-neutral-500">Alberta only</span>
              </label>
              <Select {...register("province", { required: true })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Alberta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alberta">Alberta</SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage message={errors.province && "Province is required"} />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-neutral-700">
                Postal Code <span className="text-xs text-neutral-500">e.g. T5A 0A7</span>
              </label>
              <Input
                {...register("postalCode", {
                  required: "Postal Code is required",
                  pattern: {
                    value: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
                    message: "Invalid Canadian postal code",
                  },
                })}
                placeholder="Enter postal code"
              />
              <ErrorMessage message={errors.postalCode?.message} />
            </div>
          </div>

          {/* Phone Number */}
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\(\d{3}\) \d{3}-\d{4}$/,
                message: "Invalid phone number",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col gap-1">
                <label className="text-sm text-neutral-700">
                  Phone Number <span className="text-xs text-neutral-500">e.g. (403) 123-4567</span>
                </label>
                <Input
                  value={value}
                  onChange={(e) => onChange(formatPhone(e.target.value))}
                  placeholder="(403) 123-4567"
                />
                <ErrorMessage message={errors.phoneNumber?.message} />
              </div>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit">{id ? "Save Changes" : "Add Address"}</Button>
          </div>
        </form>
      </div>
    </InlineLoader>
  );
}
