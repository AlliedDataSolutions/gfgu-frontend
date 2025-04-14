import axiosInstance from "@/core/axiosInstance";
import { handleAxiosError } from "@/lib/handleAxiosError";

interface ImageUploadResponse {
 data : {
  url : string;
  secure_url : string;
  asset_id: string;
 }
}


  export const uploadImage = async (imageData:{file?: string, filename:string }): Promise< ImageUploadResponse | null> => {
    try {
      const response = await axiosInstance.post(`/upload`, {
        ...imageData,
      });
      return response.data; // Returning product details
    } catch (error) {
      handleAxiosError(error);
      return null;
    }
  };