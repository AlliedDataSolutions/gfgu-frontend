import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value);
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === selectedValue);

  return (
    <div className={cn("w-full", className)}>
      <div className="relative mt-1">
        <div
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-md border border-grey-100 bg-neutral-50 px-3 py-1 text-base transition-colors",
            "cursor-pointer placeholder:text-grey-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-950",
            "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-brand-800 dark:placeholder:text-brand-400 dark:focus-visible:ring-brand-300"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={selectedOption ? "text-black" : "text-grey-200"}>
            {selectedOption ? selectedOption.label : placeholder}
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1dd7c5fa0d7fd7dc8eef3b5b42d58d1c82248defc1b76e4a4f1f4c9fefff7fae?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-5 shrink-0"
            alt="Dropdown arrow"
          />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[#D1D1D1] rounded-md shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-3 py-2 hover:bg-[#F6F6F6] cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
