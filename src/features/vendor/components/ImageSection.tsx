import React from "react";
import { ImageUpload } from "@/components/ui/image-upload";
import UploadImage from "../../../assets/ImgUpload.png";


interface ImageSectionProps {
  onImageUpload?: ( file: File) => void;
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  onImageUpload,
}) => {
  const handleImageUpload = () => (file: File) => {
    if (onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="w-full mt-[37px] max-md:max-w-full">
      <div className="text-[#1A1A1B] text-xl font-semibold leading-[1.4] max-md:max-w-full">
        Add Image
      </div>
      <div className="flex w-full gap-4 text-xs text-center leading-none flex-wrap mt-6 max-md:max-w-full">
        <ImageUpload
          title="Photo 1"
          icon={UploadImage}
          onImageUpload={handleImageUpload()}
        />
        <ImageUpload
          title="Photo 2"
          icon={UploadImage}
          onImageUpload={handleImageUpload()}
        />
        <ImageUpload
          title="Photo 3"
          icon={UploadImage}
          onImageUpload={handleImageUpload()}
        />
        <ImageUpload
          title="Photo 4"
          icon={UploadImage}
          onImageUpload={handleImageUpload()}
        />
      </div>
    </div>
  );
};