import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Input } from "@/components/ui/input";
import { Circle, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Vegies from "@/assets/vegies.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { toast } from "react-hot-toast";
import ErrorMessage from "@/components/ui/errormessage";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  password: z.string().min(8, "Password must be at least 6 characters"),
  accountType: z.enum(["customer", "vendor", "manager"]),
  businessName: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { watch } = useForm();
  const formValues = watch();
  console.log(formValues);

  const {
    registerUser,
    loading,
    error,
    accountType,
    setAccountType,
    agreed,
    setAgreed,
    showPassword,
    setShowPassword,
  } = useRegister();

  const onSubmit = async (data: RegisterFormData) => {
    console.log("errors::::", errors);
    if (!agreed) {
      toast.error("Invalid form");
      return;
    }
    try {
      await registerUser(data);
    } catch (err) {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen ">
      {/* Left side - Form (scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-16">
        <div className="mx-auto max-w-md">
          <h1 className="mb-2 text-center text-3xl font-semibold">
            Create Account
          </h1>
          <p className="mb-8 text-center text-gray-600">
            Create an account to buy, sell, and connect with trusted
            agricultural partners
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Account Type Selection */}
          <div className="flex justify-center space-x-6 mt-10">
            <RadioGroup
              className="grid-cols-2 gap-8 text-gray-600"
              value={accountType}
              onValueChange={setAccountType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="customer"
                  id="customer"
                  checked={accountType === "customer"}
                />
                <Label htmlFor="customer">Customer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="vendor"
                  id="vendor"
                  checked={accountType === "vendor"}
                  {...register("accountType")}
                />
                <Label htmlFor="vendor">Vendor</Label>
              </div>
            </RadioGroup>
            <ErrorMessage message={errors.accountType?.message} />
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mx-auto max-w-xl mt-10">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Your first name"
                  {...register("firstName")}
                />
                <ErrorMessage message={errors.firstName?.message} />
              </div>

              <div className="flex-1">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Your last name"
                  {...register("lastName")}
                />
                <ErrorMessage message={errors.lastName?.message} />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                placeholder="Your email address"
                {...register("email")}
              />
              <ErrorMessage message={errors.email?.message} />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter number"
                {...register("phone")}
              />
              <ErrorMessage message={errors.phone?.message} />
            </div>

            {accountType === "vendor" && (
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  type="text"
                  id="businessName"
                  placeholder="Enter name"
                  {...register("businessName")}
                />
                <ErrorMessage message={errors.businessName?.message} />
              </div>
            )}

            <div>
              <Label htmlFor="password">Password</Label>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                onIconClick={() => setShowPassword((prev) => !prev)}
              />
              <ErrorMessage message={errors.password?.message} />
              <div className="flex justify-between text-sm p-2">
                <div className="flex items-center space-x-4">
                  <Circle size={12} /> <span>Use 8 or more characters</span>
                </div>

                <div className="flex items-center space-x-4">
                  <Circle size={12} /> <span>Use a symbol (e.g. !@#$)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-2">
              <Checkbox
                checked={agreed}
                onCheckedChange={() => {
                  setAgreed(!agreed);
                }}
                id="termsAndCond"
              ></Checkbox>
              <Label htmlFor="termsAndCond">
                By continuing you agree to the Agric{" "}
                <Link className="underline" to={""}>
                  terms of service
                </Link>{" "}
                and{" "}
                <Link className="underline" to={""}>
                  privacy policy
                </Link>
                .
              </Label>
            </div>

            <Button
              //   type="submit"
              className="w-full"
              //   disabled={!isValid || !agreed || loading}
              size="lg"
              onClick={() => {
                // onSubmit(register.)
              }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </div>

      {/* banner */}
      <div className="hidden h-screen w-1/3 overflow-hidden md:block">
        <img className="h-full w-full object-cover" src={Vegies} alt="" />
      </div>
    </div>
  );
};
