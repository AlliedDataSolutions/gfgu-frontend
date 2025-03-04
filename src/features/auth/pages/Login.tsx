import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";

export const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberPassword, setRememberPassword] = React.useState(false);

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

        <div className="space-y-4 max-w-xl mt-10">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              placeholder="Your email address"
            ></Input>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              onIconClick={() => setShowPassword((prev) => !prev)}
            />
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

            <Button className="w-full mt-10" variant={"disabled"} size="lg">
              Continue
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
      </div>
    </div>
  );
};
