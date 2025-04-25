import Marquee from "react-fast-marquee";
import { CircleCheck } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  DeliveryDay,
  DeliveryDayProps,
} from "@/components/models/deliveryDays";
import useDeliveryLocations from "../hooks/useDeliveryLocations";
import Banner from "@/features/store/components/Storebanner";

export default function HeroSection({ deliveryDays }: DeliveryDayProps) {
  const { data: deliveryLocations } = useDeliveryLocations();
  return (
    <section className="relative" id="home">
      <Banner />
      <div className="bg-brand-700 py-5">
        {deliveryLocations && deliveryLocations.length > 0 && (
          <Marquee speed={50}>
            {deliveryDays.map((item, index) => (
              <DeliveryDayComp
                key={index}
                location={item.location}
                dayOfWeek={item.dayOfWeek}
              />
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}

export function DeliveryDayComp({ location, dayOfWeek }: DeliveryDay) {
  return (
    <div className="flex text-white mx-3">
      <CircleCheck />
      <p className="mx-2">
        {location.toUpperCase()}! delivery on {capitalizeFirstLetter(dayOfWeek)}
      </p>
    </div>
  );
}
