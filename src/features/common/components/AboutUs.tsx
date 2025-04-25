import { Button } from "@/components/ui/button";
import AboutUsAboutUsElipses from "@/assets/AboutUsElipses.png";
import AboutUsVeggies from "@/assets/AboutUsVeggies.png";
import AboutUsBananas from "@/assets/AboutUsBananas.png";
import AboutUsApples from "@/assets/AboutUsApples.png";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

export function AboutUs() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full" id="about">

      {/* Main container: uses desktop layout on md+, mobile layout below */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row items-center gap-[74px] w-[1189px] h-[566px] mx-auto">
          {/* Left side: Image collage (desktop) */}
          <div className="relative w-[655px] h-[566px]">
            <img
              src={AboutUsAboutUsElipses}
              alt="Ellipses pattern"
              className="absolute w-[240px] h-[189px] top-0 left-0"
            />
            <img
              src={AboutUsVeggies}
              alt="Veggies"
              className="absolute w-[412px] h-[492px] left-[34px] top-[58px] rounded-md"
            />
            <img
              src={AboutUsBananas}
              alt="Bananas"
              className="absolute w-[186px] h-[187px] left-[469px] top-[58px] rounded-md"
            />
            <img
              src={AboutUsApples}
              alt="Apples"
              className="absolute w-[276px] h-[298px] left-[379px] top-[268px] rounded-md"
            />
          </div>

          {/* Right side: Text content (desktop) */}
          <div className="flex flex-col justify-evenly  w-[460px] h-[472px]">
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
                  to special pricing and, of course, the best the farming
                  community has to offer!
                </p>
              </div>
              <Button>Join Us</Button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden gap-8">
          {/* Image collage simplified for mobile */}
          <div className="w-full">
            <img
              src={AboutUsVeggies}
              alt="Veggies"
              className="w-full h-auto rounded-md"
            />
            <div className="flex gap-4 mt-4">
              <img
                src={AboutUsBananas}
                alt="Bananas"
                className="w-1/2 h-auto rounded-md"
              />
              <img
                src={AboutUsApples}
                alt="Apples"
                className="w-1/2 h-auto rounded-md"
              />
            </div>
          </div>
          {/* Text content for mobile */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="w-3 h-3 bg-rose-600 rounded-full" />
              <span className="text-lg font-semibold text-neutral-900">
                ABOUT US
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 leading-tight">
                Alberta Farm to Table Membership Club
              </h2>
              <p className="text-base sm:text-lg leading-6 text-neutral-800">
                We are a membership club connecting farmers, producers, and
                local businesses to you! As a community member you have access
                to special pricing and, of course, the best the farming
                community has to offer!
              </p>
            </div>
            <Button onClick={() => navigate(paths.auth.register.path)}>
              Join Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
