import React from "react";
import { ImageUpload } from "@/components/ui/image-upload";

interface ImageSectionProps {
  onImageUpload?: (index: number, file: File) => void;
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  onImageUpload,
}) => {
  const handleImageUpload = (index: number) => (file: File) => {
    if (onImageUpload) {
      onImageUpload(index, file);
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
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/55ee800eec0ed2ab8c65a7b27e2c1cc8ed0550c7eda092e572730082b86a0cc5?placeholderIfAbsent=true"
          onImageUpload={handleImageUpload(0)}
        />
        <ImageUpload
          title="Photo 2"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/c06317be7cb9db7999011af4d78202c7a5e0935e53ddadeebec3f12960362f88?placeholderIfAbsent=true"
          onImageUpload={handleImageUpload(1)}
        />
        <ImageUpload
          title="Photo 3"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/55ee800eec0ed2ab8c65a7b27e2c1cc8ed0550c7eda092e572730082b86a0cc5?placeholderIfAbsent=true"
          onImageUpload={handleImageUpload(2)}
        />
        <ImageUpload
          title="Photo 4"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/c06317be7cb9db7999011af4d78202c7a5e0935e53ddadeebec3f12960362f88?placeholderIfAbsent=true"
          onImageUpload={handleImageUpload(3)}
        />
      </div>
    </div>
  );
};