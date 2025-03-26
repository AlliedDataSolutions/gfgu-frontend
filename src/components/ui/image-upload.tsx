import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  title: string;
  icon: string;
  className?: string;
  onImageUpload?: (file: File) => void;
  value?:string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  title,
  icon,
  className,
  onImageUpload,
  value
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  useEffect(()=>{
    if(value){
    setPreview(value)
    }
  },[value])

  return (
    <div
      className={cn(
        "bg-blue-50 border flex flex-col items-stretch justify-center flex-1 shrink basis-[0%] p-5 rounded-lg border-blue-100 border-dashed cursor-pointer",
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
            <div className="text-blue-100 font-medium">{title}</div>
            <div className="text-gray-400 font-normal mt-1">(3MB Max)</div>
          </div>
        </>
      )}
    </div>
  );
};
