import axiosInstance from "@/core/axiosInstance";
import { User } from "@/core/user";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (user: User) => void;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/user/profile", {
        withCredentials: true,
      });
      const data = response.data;
      setUser(data);
    } catch (error) {
      setUser(null);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/profile", {
          withCredentials: true, // Ensures the request includes cookies
        });

        const data = response.data;
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token"); 
    setUser(null); 
    setToken(null);
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, login, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
