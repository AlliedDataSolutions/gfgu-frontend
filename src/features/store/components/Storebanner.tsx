import ShopBgImg from "@/assets/ShopBgImg.png";

export default function Banner() {
  return (
    <div className="relative w-full  overflow-hidden">
      {/* Mobile background image with overlay */}
      <div className="md:hidden absolute inset-0 z-0">
        <img
          src={ShopBgImg}
          alt="Fresh produce"
          className="object-cover opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 flex flex-col md:flex-row items-center">
        {/* Text content */}
        <div className="z-10 md:w-1/2 text-white space-y-4">
          <p className="text-sm md:text-base">Always fresh product for you</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Feast Your Senses,
            <span className="block text-yellow-300">Fast and Fresh</span>
          </h1>
        </div>

        {/* Desktop image - hidden on mobile */}
        <div className="hidden md:block md:w-1/2 relative h-64 md:h-80 lg:h-96">
          <img
            src={ShopBgImg}
            alt="Fresh produce basket"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

