import Footer from "@/components/ui/footer";
import LandingHeader from "../components/LandingHeader";
import HeroSection from "../components/HeroSection";
import Delivery from "../components/Delivery";
import AboutUs from "../components/AboutUs";
import Need from "../components/need";
import { deliveryDays, menuItems } from "@/core/data";
export const Landing = () => {
  return (
    <>
      <div className="pt-14 md:pt-16">
        <LandingHeader menuItems={menuItems} />
      </div>
      <HeroSection deliveryDays={deliveryDays} />
      <AboutUs />
      <Need />
      <Delivery deliveryDays={deliveryDays} />
      <Footer menuItems={menuItems} />
    </>
  );
};
