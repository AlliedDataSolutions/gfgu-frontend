import axiosInstance from "@/core/axiosInstance";
import { User } from "@/core/user";
import { useState } from "react";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const loginUser = async (data: LoginData) => {
    try {
      setLoading(true);
      const loginResponse = await axiosInstance.post("/auth/login", data);
      const { token, refreshToken } = loginResponse.data;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        // extra check if cookies has token
        const userProfileResponse = await axiosInstance.get("/user/profile");
        return userProfileResponse.data as User;
      } else {
        throw new Error("Login unsuccessful");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    showPassword,
    setShowPassword,
    rememberPassword,
    setRememberPassword,
    loginUser,
  };
};
