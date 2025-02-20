import bgHero from "../../../assets/bg-hero.png";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";
import { CircleCheck } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  DeliveryDay,
  DeliveryDayProps,
} from "@/components/models/deliveryDays";

export default function HeroSection({ deliveryDays }: DeliveryDayProps) {
  return (
    <section className="relative">
      <div>
        <div>
          <img
            className="h-96 md:h-[calc(100vh-8rem)] w-full object-cover"
            src={bgHero}
            alt="background hero"
          />
        </div>
        <div className="container">
          <div className="absolute top-0 bottom-16 left-0 right-0 flex  max-w-screen-xl mx-auto">
            <div className="  m-auto sm:right-auto sm:ml-14 h-72 inline-flex-col  max-w-sm md:max-w-xl p-12 space-y-16 rounded-lg bg-[#F5FFF9]">
              <div>
                <h1 className="text-2xl md:text-5xl bg-gradient-to-r from-brand-900 to-brand-200 bg-clip-text text-transparent">
                  GROWING FROM THE GROUND UP
                </h1>
                <h2 className="tex-xl md:text-sm mt-2 ">
                  Sign Up to Shop in Our Community. It's Free!
                </h2>
              </div>

              <Button>Create Account Now</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-brand-700 py-5">
        <Marquee speed={50}>
          {deliveryDays.map((item) => (
            <DeliveryDayComp
              location={item.location}
              dayOfWeek={item.dayOfWeek}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function DeliveryDayComp({ location, dayOfWeek }: DeliveryDay) {
  return (
    <div className="flex text-white mx-3">
      <CircleCheck />
      <p className="mx-2">
        {location.toUpperCase()}! delivery on {capitalizeFirstLetter(dayOfWeek)}
      </p>
    </div>
  );
}
