import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(value: string) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM dd, yyyy 'at' hh:mm a");
};
