import UnderConstruction from "@/assets/under-construction-anim.webm";

export default function UnderConstructionBox() {
  return (
    <div className="m-auto w-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
      >
        <source src={UnderConstruction} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
