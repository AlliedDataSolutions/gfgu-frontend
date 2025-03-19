import axiosInstance from "@/core/axiosInstance";
import { Role } from "@/core/role";
import { User } from "@/core/user";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface FilterUsers {
  page?: number;
  limit?: number;
  search?: string;
  isConfirmed?: Boolean;
  account: Role[];
  status: string[];
}

interface AllUserResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  users: User[];
}

const transformUser = (user: any): User => ({
  ...user,
  role: user.vendor ? Role.vendor : Role.customer,
  modifiedDate: new Date(user.modifeidDate),
  createdDate: new Date(user.createdDate),
});

export const useManageUser = (filters: FilterUsers) => {
  const [loading, setLoading] = useState(false);
  const [allUserData, setAllUserData] = useState<AllUserResponse>({
    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 2,
    users: [],
  });

  useEffect(() => {
    fetchUser();
  }, [filters]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/admin/users`, filters);
      const allUserData = response.data as AllUserResponse;
      setAllUserData({
        ...allUserData,
        users: allUserData.users.map(transformUser),
      });
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const confirmUser = async (userId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/admin/users/${userId}/confirm`
      );
      const message = response.data.message;
      const updatedUser = response.data.user as User;

      setAllUserData((prev) => ({
        ...prev,
        users: prev.users.map((user) =>
          user.id === updatedUser.id ? transformUser(updatedUser) : user
        ),
      }));
      toast.success(message);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const setVendorStatus = async (userId: string, status: string) => {
    try {
      const data = {
        status: status,
      };
      setLoading(true);
      const response = await axiosInstance.put(
        `/admin/users/${userId}/vendor-status`,
        data
      );
      const updatedUser = response.data.user as User;

      setAllUserData((prev) => ({
        ...prev,
        users: prev.users.map((user) =>
          user.id === updatedUser.id
            ? transformUser({ ...user, vendor: updatedUser.vendor })
            : user
        ),
      }));
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `/admin/users/${userId}/delete`
      );
      const message = response.data.message;

      setAllUserData((prev) => ({
        ...prev,
        users: prev.users.filter((user) => user.id !== userId),
      }));

      toast.success(message);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    allUserData,
    confirmUser,
    setVendorStatus,
    deleteUser,
  };
};
