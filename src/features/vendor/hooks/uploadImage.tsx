import { Product,  } from "@/components/models/type";
import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";


  export const uploadImage = async (imageData:FormData): Promise<Product | null> => {
    try {
      const response = await axiosInstance.get(`https://api.cloudinary.com/v1_1/da1ekxybq/image/upload`, {
        data: imageData,
      });
      return response.data; // Returning product details
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };