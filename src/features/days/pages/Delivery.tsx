import DeliveryBgImg from "../../../assets/DeliveryBgImg.png";
import DeliverySideImg from "../../../assets/DeliverySideImg.jpeg";
import DeliveryImg from "../../../assets/DeliveryImg.png";


const Delivery = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-white to-[#2EEF76A6] flex justify-center items-center p-6">
      {/* Background Image */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 md:h-1/2 flex justify-end">
        <img
          src={DeliveryBgImg} // Background image
          alt="Background"
          className="opacity-50"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 bg-[#E1FFE8] p-6 md:p-12 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row items-center">
        {/* Left Side - Delivery Image */}
        <div className="w-full md:w-1/2">
          <img
            src={DeliverySideImg} // Main image
            alt="Delivery Person"
            width={400}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Delivery Details */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6">
          <h2 className="text-2xl font-semibold tracking-widest ">
            DELIVERY DAYS
          </h2>
          

          {/* Delivery Schedule */}
          <div className="mt-2 bg-[#35736E2E] p-2 rounded-md shadow-sm ">
          <img src={DeliveryImg} alt="Delivery Icon" className="w-14 h-14" />
            
            <div className="space-y-3 ">

              {[
                { city: "CALGARY", time: "WEDNESDAY" },
                { city: "RED DEER", time: "WEDNESDAY AFTERNOON" },
                { city: "RED DEER", time: "WEDNESDAY AFTERNOON" },
                { city: "EDMONTON", time: "WEDNESDAY EVENING" },
                { city: "LETHBRIDGE", time: "THURSDAY" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-gray-400  p-3 rounded-md shadow-sm border-2"
                >
                  <span className="text-black font-medium">{item.city}</span>
                  <span className="text-gray-700">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Delivery Information */}
          <p className="mt-4 text-sm text-gray-600">
            If you live in the Edmonton Lethbridge corridor and you want a
            delivery, please contact us to sort something out. We are working on
            getting deliveries to Canmore. Currently delivering to Claresholm,
            Carmangay, Okotoks, and DeWinton.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

