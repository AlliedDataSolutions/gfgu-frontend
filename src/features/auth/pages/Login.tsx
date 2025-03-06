import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { useLogin } from "../hooks/useLogin";
import { z } from "zod";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Role } from "@/core/role";
import ErrorMessage from "@/components/ui/errormessage";
import { useAuth } from "@/features/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const {
    loading,
    showPassword,
    setShowPassword,
    rememberPassword,
    setRememberPassword,
    loginUser,
  } = useLogin();

  const onsubmit = async (data: LoginFormData) => {
    try {
      const user = await loginUser(data);

      login(user);

      const searchParams = new URLSearchParams(location.search);
      const redirectTo = searchParams.get("redirectTo");

      if (redirectTo) {
        navigate(redirectTo, { replace: true });
      } else {
        if (user.role === Role.customer) {
          navigate(paths.store.home.path, { replace: true });
        } else if (user.role === Role.vendor) {
          navigate(paths.vendor.dashboard.path, { replace: true });
        }
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <div className="h-screen bg-brand-100 flex justify-center">
      <div className="flex my-auto flex-col bg-white rounded-md overflow-y-auto px-6 py-10 md:p-10 lg:p-16">
        <div className="mx-auto max-w-md">
          <h1 className="mb-2 text-center text-3xl font-semibold">
            Login to your account
          </h1>
          <p className="mb-8 text-center text-gray-600">
            Welcome back! Access your dashboard to manage your farm, shop, or
            orders
          </p>
        </div>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="space-y-4 max-w-xl mt-10">
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
              <Label htmlFor="password">Password</Label>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
                icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                onIconClick={() => setShowPassword((prev) => !prev)}
              />
              <ErrorMessage message={errors.password?.message} />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 ">
                  <Checkbox
                    className="text-sm"
                    checked={rememberPassword}
                    onCheckedChange={() => {
                      setRememberPassword(!rememberPassword);
                    }}
                    id="rememberPassword"
                  ></Checkbox>
                  <Label>Remember me</Label>
                </div>

                <Button
                  className="underline p-0 -mt-4 items-end"
                  variant={"link"}
                >
                  Forget your password
                </Button>
              </div>

              <Button className="w-full mt-10" size="lg" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>

              <div className="w-full border mt-10"></div>

              <div className="border rounded mt-5">
                <p className="text-sm text-center">
                  Don’t have an account?{" "}
                  <Button className="px-0" variant={"link"}>
                    <Link to={paths.auth.register.path} replace>
                      Sign up
                    </Link>
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
