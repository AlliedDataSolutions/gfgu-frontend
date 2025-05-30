import React from "react";
import { ImageUpload } from "@/components/ui/image-upload";
import UploadImage from "../../../assets/ImgUpload.png";


interface ImageSectionProps {
  onImageUpload?: (index: number, file: File) => void;
  images : string[]
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  onImageUpload,
  images
}) => {
  const handleImageUpload = (index: number) => (file: File) => {
    if (onImageUpload) {
      onImageUpload(index, file);
    }
  };
  
  return (
    <div className="w-full mt-[37px] max-md:max-w-full">
      <div className="text-xl font-semibold leading-[1.4] max-md:max-w-full">
        Add Image
      </div>
      <div className="flex w-full gap-4 text-xs text-center leading-none flex-wrap mt-6 max-md:max-w-full">
        <ImageUpload
          title="Photo 1"
          icon={UploadImage}
          onImageUpload={handleImageUpload(0)}
          value={images[0]}
        />
        <ImageUpload
          title="Photo 2"
          icon={UploadImage}
          onImageUpload={handleImageUpload(1)}
          value={images[1]}
        />
        <ImageUpload
          title="Photo 3"
          icon={UploadImage}
          onImageUpload={handleImageUpload(2)}
          value={images[2]}
        />
        <ImageUpload
          title="Photo 4"
          icon={UploadImage}
          onImageUpload={handleImageUpload(3)}
          value={images[3]}
        />
      </div>
    </div>
  );
};