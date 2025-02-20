import { useState } from "react";
import { Menu } from "lucide-react";
import AppIcon from "../../../assets/react.svg";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { LandingHeaderProps } from "@/components/models/landingMenuItems";

export default function LandingHeader({ menuItems }: LandingHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="md:shadow-sm">
      <header className="container mx-auto min-h-14 md:min-h-16 flex items-center ">
        <div className="flex flex-grow items-center justify-between max-w-screen-xl px-4">
          <div>
            <img src={AppIcon} alt="App icon" />
          </div>

          <div className="flex space-x-14 items-center">
            <nav className="hidden md:flex space-x-2">
              {menuItems.map((item) => (
                <Button key={item.name} variant="link">
                  <Link to={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Button
                  className="bg-neutral-50 border border-neutral-100 text-neutral-900 shadow-none"
                  onClick={() => navigate(paths.auth.register.path)}
                >
                  Create Account
                </Button>
                <Button onClick={() => navigate(paths.auth.login.path)}>
                  Login
                </Button>
              </div>

              <Menu className="md:hidden" onClick={() => setIsOpen(!isOpen)} />

              {isOpen && (
                <div className="absolute z-50 right-6 top-14 bg-white shadow-md flex md:hidden">
                  <nav className="flex-col">
                    {menuItems.map((item) => (
                      <Button key={item.name} className="block" variant="link">
                        <Link to={item.href}>{item.name}</Link>
                      </Button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
