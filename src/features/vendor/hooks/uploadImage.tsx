import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";

interface ImageUploadResponse {
  url : string;
  secure_url : string;
  asset_id: string;
}


  export const uploadImage = async (imageData:FormData): Promise< ImageUploadResponse | null> => {
    try {
      const response = await axiosInstance.get(`https://api.cloudinary.com/v1_1/da1ekxybq/upload`, {
        data: imageData,
      });
      return response.data; // Returning product details
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };