import ProductView from "./ProductDetails";
import Marquee from "react-fast-marquee";
import { DeliveryDayComp } from "@/features/common/components/HeroSection";
import { deliveryDays } from "@/features/common";

export default function Page() {
  return (
    <main>
      {/* Scrolling Marquee */}
      <div className="bg-black py-5 relative z-10">
        <Marquee speed={50}>
          {deliveryDays.map((item) => (
            <DeliveryDayComp
              location={item.location}
              dayOfWeek={item.dayOfWeek}
            />
          ))}
        </Marquee>
      </div>
      <ProductView />
    </main>
  );
}
