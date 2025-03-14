import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/core/axiosInstance";
import { paths } from "@/config/paths";
import { Pencil, Trash2 } from "lucide-react";

// Example of what an address might look like
interface AddressData {
  id: string;
  addressLine1: string;
  city: string;
  email?: string; 
}

export default function AddressList() {
  const [addresses, setAddresses] = useState<AddressData[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/address") 
      .then((res) => {
        setAddresses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
      });
  }, []);

  return (
    <div>
      {/* Top Tabs for "Personal Information" and "Address" */}
      <div className="flex bg-gray-200 p-2 rounded mb-4">
        {/* Personal Info tab */}
        <Link
          to={paths.account.personalInfo.getHref()}
          className="flex-1 text-center py-2"
        >
          Personal Information
        </Link>
        {/* Address tab (active) */}
        <div className="flex-1 text-center py-2 bg-green-50 text-green-700 font-semibold rounded">
          Address
        </div>
      </div>

      {/* "Add Address" button */}
      <div className="flex justify-end mb-4">
        <Link
          to={paths.account.addAddress.getHref()}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          + Add Address
        </Link>
      </div>

      {/* Address Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-2 w-1/3">Address</th>
              <th className="px-4 py-2 w-1/4">Email Address</th>
              <th className="px-4 py-2 w-1/4">City</th>
              <th className="px-4 py-2 w-1/6">Action</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.addressLine1}</td>
                <td className="px-4 py-2">{item.email || "john@123"}</td>
                <td className="px-4 py-2">{item.city}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-3">
                    {/* Edit button */}
                    <button className="text-black hover:text-green-700">
                      <Pencil size={20} />
                    </button>
                    {/* Delete button */}
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Example of a placeholder row if no addresses are fetched */}
            {addresses.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No addresses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
