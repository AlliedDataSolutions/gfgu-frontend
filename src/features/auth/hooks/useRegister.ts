import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "customer" | "vendor" | "manager";
  businessName?: string;
}

export const useRegister = () => {
  const navigate = useNavigate(); // ✅ Handle navigation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountType, setAccountType] = useState("customer");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("/auth/register", data);

      if (data.accountType === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      //   throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registerUser,
    loading,
    error,
    accountType,
    setAccountType,
    agreed,
    setAgreed,
    showPassword,
    setShowPassword,
  };
};
