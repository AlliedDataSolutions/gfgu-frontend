import { useState } from "react";
import axiosInstance from "@/core/axiosInstance";
import { Role } from "@/core/role";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  businessName?: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState("customer");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = async (data: RegisterData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/register", data);
      return response.data;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    accountType,
    setAccountType,
    agreed,
    setAgreed,
    showPassword,
    setShowPassword,
  };
};
