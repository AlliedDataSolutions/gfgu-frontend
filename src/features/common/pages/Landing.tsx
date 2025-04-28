import Footer from "@/components/ui/footer";
import LandingHeader from "../components/LandingHeader";
import Delivery from "../components/Delivery";
import AboutUs from "../components/AboutUs";
import Need from "../components/need";
import { menuItems } from "@/core/data";
import useDeliveryLocations from "../hooks/useDeliveryLocations";
import HeroSection from "../components/HeroSection";

export const Landing = () => {
  const { data: deliveryLocations } = useDeliveryLocations();

  return (
    <>
      <div className="pt-14 md:pt-16">
        <LandingHeader menuItems={menuItems} />
        <HeroSection deliveryDays={deliveryLocations} />
        <AboutUs />
      </div>
      <Need />
      {deliveryLocations && deliveryLocations.length > 0 && (
        <Delivery deliveryDays={deliveryLocations} />
      )}
      <Footer menuItems={menuItems} />
    </>
  );
};
