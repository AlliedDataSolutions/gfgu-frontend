import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  title: string;
  icon: string;
  className?: string;
  onImageUpload?: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  title,
  icon,
  className,
  onImageUpload,
}) => {
  // const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (onImageUpload) {
        onImageUpload(file);
      }
    }
  };

  return (
    <div
      className={cn(
        "bg-[rgba(238,247,255,1)] border flex flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-5 rounded-lg border-[rgba(26,113,246,1)] border-dashed cursor-pointer",
        className,
      )}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {preview ? (
        <div className="aspect-square w-full overflow-hidden flex items-center justify-center">
          <img
            src={preview}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <>
          <img
            src={icon}
            className="aspect-[1] object-contain w-8 self-center"
            alt="Upload icon"
          />
          <div className="flex w-full flex-col mt-2 text-xs text-center">
            <div className="text-[#1A71F6] font-medium">{title}</div>
            <div className="text-[#888] font-normal mt-1">(3MB Max)</div>
          </div>
        </>
      )}
    </div>
  );
};
