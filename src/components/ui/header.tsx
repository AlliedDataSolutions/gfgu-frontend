import { useState } from "react";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
import AppIcon from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import { Link,} from "react-router-dom";
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="bg-[#888888] bg-opacity-50 text-black placeholder-white placeholder-opacity-75 py-2 px-4 rounded-full shadow-md focus:outline-none"
                  style={{
                    background: "linear-gradient(135deg, #D1D1D1, #e0e0e0)",
                    border: "1px solid #ccc",
                    width: "400px",
                  }}
                />
                <button
                  className="absolute right-0 top-0 bottom-0 flex items-center justify-center px-4"
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <Search className="w-5 h-5 text-black" />
                </button>
              </div>

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