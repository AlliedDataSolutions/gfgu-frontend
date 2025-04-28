import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "@/core/axiosInstance";
import { Button } from "@/components/ui/button";

export function ProfilePage() {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    vendor?: {
      businessName: string;
      businessDescription: string;
    };
  } | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    axios.get("/user/profile").then((res) => setUser(res.data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500">
        <Link to="/">Home</Link> / <span>Profile</span>
      </nav>

      {/* Name */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Name</h3>
          <p className="text-sm">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <Button variant="outline" onClick={() => nav("name")}>
          Edit
        </Button>
      </div>

      {/* Email */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Email</h3>
          <p className="text-sm">{user.email}</p>
        </div>
        <Button variant="outline" onClick={() => nav("email")}>
          Edit
        </Button>
      </div>

      {/* Password */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Password</h3>
          <p className="text-sm">••••••••</p>
        </div>
        <Button variant="outline" onClick={() => nav("password")}>
          Change
        </Button>
      </div>

      {/* Vendor Details */}
      {user?.vendor && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Business Name</h3>
              <p className="text-sm">{user.vendor.businessName}</p>
            </div>
          </div>
          {
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Business Description</h3>
                <p className="text-sm">{user.vendor.businessDescription}</p>
              </div>
            </div>
          }
        </>
      )}
    </div>
  );
}
