import { useState } from "react";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
import AppIcon from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "./input";
//import { paths } from "@/config/paths";

interface MenuItem {
  name: string;
  href: string;
}

interface HeaderProps {
  menuItems: MenuItem[];
}

export default function Header({ menuItems }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:shadow-sm">
      <header className="fixed top-0 left-0 w-full bg-white z-50  mx-auto min-h-14 md:min-h-16 flex items-center ">
        <div className="flex flex-grow items-center mx-auto container justify-between max-w-screen-xl px-4">
          <div>
            <img src={AppIcon} alt="App icon" />
          </div>

          <div className="flex items-center">
            <nav className="hidden md:flex space-x-2">
              {menuItems.map((item) => (
                <Button key={item.name} variant="link">
                  <Link to={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Input
                className="flex-1 sm:w-64"
                type={"text"}
                placeholder="What are you looking for?"
                icon={<Search size={18} />}
              />

              <button
                className="flex items-center text-[#HEX background: #1A1A1B;] hover:text-[#35736e] focus:outline-none"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button
                className="flex items-center text-[#HEX background: #1A1A1B;] hover:text-[#35736e] focus:outline-none"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <User className="w-5 h-5" />
              </button>

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
