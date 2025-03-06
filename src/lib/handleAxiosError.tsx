import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export const handleAxiosError = (err: unknown) => {
  if (err instanceof AxiosError) {
    // Check if it's an Axios error and safely access properties
    if (err.response) {
      // If the response exists, access error details
      toast.error(err.response?.data?.message || "An error occurred");
    } else if (err.request) {
      // If no response was received
      toast.error("No response from server");
    } else {
      // For errors setting up the request
      toast.error(`Request error: ${err.message}`);
    }
  } else {
    // Handle other errors (e.g., programming errors)
    console.log(err);
    toast.error("Something went wrong");
  }
};
