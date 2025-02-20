import React from "react";
import { Button } from "@/components/ui/button";
import elipses from "@/assets/elipses.png";
import rect9 from "@/assets/rect9.png";
import rect10 from "@/assets/rect10.png";
import rect11 from "@/assets/rect11.png";


export const AboutUs: React.FC = () => {
  return (
    
    <section className="relative w-full h-[822px]">
      <div
        className="absolute bg-[#C0D4D2] opacity-[0.1]"
        style={{
          width: "1440px",
          height: "822px",
          left: "calc(50% - 720px)", 
          top: "calc(50% - 411px)",
        }}
      />

      <div
        className="absolute flex flex-row items-center gap-[74px]"
        style={{
          width: "1189px",
          height: "566px",
          left: "calc(50% - 1189px/2 - 0.5px)",  
          top: "calc(50% - 566px/2 - 10px)",     
        }}
      >

        <div className="relative w-[655px] h-[566px]">
          {/* The big green-dots image from Figma = "Group 25" */}
          <img
            src={elipses}
            alt="Ellipses pattern"
            className="absolute w-[239.9px] h-[189px] top-0 left-0"
          />
          <img
            src={rect9}
            alt="Rectangle 9"
            className="absolute w-[412.11px] h-[492px] left-[33.84px] top-[58px] rounded-[10px]"
          />
          <img
            src={rect10}
            alt="Rectangle 10"
            className="absolute w-[186.15px] h-[187px] left-[468.85px] top-[58px] rounded-[10px]"
          />
          <img
            src={rect11}
            alt="Rectangle 11"
            className="absolute w-[275.74px] h-[298px] left-[379.26px] top-[268px] rounded-[10px]"
          />
        </div>

        {/*
          RIGHT SIDE (text) = Frame 173
          460 x 472, with two main sub-sections:
            - "ABOUT US" label
            - Headline + paragraph + button
        */}
        <div className="flex flex-col items-start gap-[161px] w-[460px] h-[472px]">
          {/* Title row */}
          <div className="flex flex-row items-center gap-[4px] w-[109px] h-[28px]">
            <div className="w-[12px] h-[12px] bg-rose-600 rounded-full" />
            <span className="text-[18px] font-semibold leading-[28px] text-[#3D3D3D]">
              ABOUT US
            </span>
          </div>

          {/* Headline + paragraph + button */}
          <div className="flex flex-col items-start gap-[35px] w-[460px] h-[283px]">
            <div className="flex flex-col items-start gap-[16px] w-full">
              <h2 className="text-[36px] font-semibold leading-[40px] text-[#1A1A1B]">
                Alberta Farm to Table Membership Club
              </h2>
              <p className="text-[16px] font-normal leading-[24px] text-[#454545]">
                We are a membership club connecting farmers, producers,
                local businesses to you! As a community member you have
                access to special pricing and of course the best the
                farming community has to offer!
              </p>
            </div>
            <Button
              variant="default"
              size="default"
              className="w-[180px] h-[56px] bg-green-600 text-white rounded-lg text-[16px] leading-[24px] hover:bg-green-700"
            >
              Join Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
