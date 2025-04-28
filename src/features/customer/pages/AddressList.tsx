import  useAddress  from "../hooks/useAddress";
import { useNavigate } from "react-router-dom";
import InlineLoader from "@/components/ui/inlineloading";
import { Button } from "@/components/ui/button";

export default function AddressList() {
  const { addresses, loading, removeAddress } = useAddress();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this address?");
    if (confirmed) {
      removeAddress(id);
    }
  };

  return (
    <InlineLoader loading={loading}>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Add Address Card */}
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400"
            onClick={() => navigate("/account/add-address")}
          >
            <span className="text-6xl text-gray-400">+</span>
            <p className="mt-2 text-gray-500">Add Address</p>
          </div>

          {/* Address Cards */}
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border rounded-lg shadow-md p-6 flex flex-col justify-between"
            >
              <div className="mb-4">
                <h2 className="font-bold">{address.streetName}</h2>
                <p>{address.town}, {address.province}</p>
                <p>{address.postalCode}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/account/edit-address/${address.id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(address.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InlineLoader>
  );
}
