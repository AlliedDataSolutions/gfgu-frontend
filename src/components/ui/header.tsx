import { useState, useContext } from "react";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
import AppIcon from "@/assets/bee-logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "./input";
import { paths } from "@/config/paths";
import { useNavigate } from "react-router-dom";
import { CartDataContext } from "@/features/store/hooks/useCart";

interface MenuItem {
  name: string;
  href: string;
}

interface HeaderProps {
  menuItems: MenuItem[];
}

export default function Header({ menuItems }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigationToCart = () => {
    navigate(`${paths.store.cartPage.path}`);
  };

  const { cart } = useContext(CartDataContext);

  // Calculate total quantity of items in cart
  const totalItems = cart.product.reduce((total, item) => total + Number(item.quantity), 0);

  return (
    <div className="md:shadow-sm">
      <header className="fixed top-0 left-0 w-full bg-white z-50  mx-auto min-h-14 md:min-h-16 flex items-center ">
        <div className="flex flex-grow items-center mx-auto container justify-between max-w-screen-xl px-4">
          <div>
            <a href={paths.landing.path} className="block w-12 h-12">
              <img
                src={AppIcon}
                alt="App icon"
                className="w-full h-full object-contain"
              />
            </a>
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

              {/* Cart Button with Badge */}
              <Button variant="link" className="p-0" onClick={handleNavigationToCart}>
                <div className="relative cursor-pointer">
                  {/* Shopping Cart Icon */}
                  <ShoppingCart className="h-6 w-6 text-gray-700" />

                  {/* Badge - Shows only if cart has items */}
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Button>
              <Button variant={"link"} className="p-0">
                <Link to={paths.account.account.path}>
                  <User className="w-5 h-5" />
                </Link>
              </Button>

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
