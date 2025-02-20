import Footer from "@/components/ui/footer";
import LandingHeader from "../components/LandingHeader";
import HeroSection from "../components/HeroSection";
import Delivery from "../components/Delivery";

export const Landing = () => {
  return (
    <>
      <LandingHeader menuItems={menuItems} />
      <HeroSection deliveryDays={deliveryDays} />
      <Delivery deliveryDays={deliveryDays} />
      <Footer menuItems={menuItems} />
    </>
  );
};

const deliveryDays = [
  { location: "edmonton", dayOfWeek: "Wednessday" },
  { location: "calgary", dayOfWeek: "Tuesday" },
  { location: "lethbridge", dayOfWeek: "Thursday" },
  { location: "airdrie", dayOfWeek: "Friday" },
];

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Delivery Days", href: "#deliveryDays" },
  { name: "Contact", href: "#contact" },
];
