// import React from "react";
import { Button } from "@/components/ui/button";
import elipses from "@/assets/elipses.png";
import rect9 from "@/assets/rect9.png";
import rect10 from "@/assets/rect10.png";
import rect11 from "@/assets/rect11.png";

export function AboutUs() {
  return (
    <section className="relative w-full h-[822px]">
      {/* Background overlay */}
      <div
        className="
          absolute w-[1440px] h-[822px] 
          bg-green-100 opacity-10 
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        "
      />

      {/* Main content container */}
      <div
        className="
          absolute flex flex-row items-center gap-[74px]
          w-[1189px] h-[566px]
          left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        "
      >
        {/* Left side: Image collage */}
        <div className="relative w-[655px] h-[566px]">
          <img
            src={elipses}
            alt="Ellipses pattern"
            className="absolute w-[240px] h-[189px] top-0 left-0"
          />
          <img
            src={rect9}
            alt="Rectangle 9"
            className="absolute w-[412px] h-[492px] left-[34px] top-[58px] rounded-md"
          />
          <img
            src={rect10}
            alt="Rectangle 10"
            className="absolute w-[186px] h-[187px] left-[469px] top-[58px] rounded-md"
          />
          <img
            src={rect11}
            alt="Rectangle 11"
            className="absolute w-[276px] h-[298px] left-[379px] top-[268px] rounded-md"
          />
        </div>

        {/* Right side: Text content */}
        <div className="flex flex-col items-start gap-[161px] w-[460px] h-[472px]">
          {/* ABOUT US label */}
          <div className="flex flex-row items-center gap-2">
            <div className="w-3 h-3 bg-rose-600 rounded-full" />
            <span className="text-lg font-semibold text-neutral-900">
              ABOUT US
            </span>
          </div>

          <div className="flex flex-col gap-9 w-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-semibold text-neutral-900 leading-10">
                Alberta Farm to Table Membership Club
              </h2>
              <p className="text-base leading-6 text-neutral-800">
                We are a membership club connecting farmers, producers, and
                local businesses to you! As a community member you have access
                to special pricing and, of course, the best the farming community
                has to offer!
              </p>
            </div>
            <Button>
            Join Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;