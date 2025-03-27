import { format } from "date-fns";

export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ");
}

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM dd, yyyy 'at' hh:mm a");
};
