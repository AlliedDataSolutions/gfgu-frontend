import { useState } from "react";
import { Menu } from "lucide-react";
import AppIcon from "../../assets/react.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

export default function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Delivery Days", href: "#deliveryDays" },
    { name: "Contact", href: "#contact" },
  ];

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
                <Button variant="link">
                  <a href={item.href}>{item.name}</a>
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
                <div className="absolute right-6 top-14 bg-white shadow-md md:hidden">
                  <nav className="flex-col">
                    {menuItems.map((item) => (
                      <Button className="block" variant="link">
                        <a href={item.href}>{item.name}</a>
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
