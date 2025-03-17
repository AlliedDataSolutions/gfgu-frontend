import { useState } from "react";
import { Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmationStatus, User } from "@/core/user";
import { Role } from "@/core/role";
import { capitalizeFirstLetter } from "@/lib/utils";

interface UserTableProps {
  loading: boolean;
  users: User[];
  handleDelete: (user: User) => void;
  handleAction: (user: User, action: string) => void;
}

export const getStatus = (user: User): string[] => {
  let actions: string[] = [];

  if (user.isConfirmed) {
    actions.push("Active");
  } else {
    actions.push("Disabled");
  }

  // If the user is a vendor, handle ConfirmationStatus actions
  if (user.role === Role.vendor && user.vendor) {
    actions.push(capitalizeFirstLetter(user.vendor.status));
  }

  return actions;
};

export const getAdminActions = (user: User): string[] => {
  let actions: string[] = [];

  // Confirm/Unconfirm actions
  if (user.isConfirmed) {
    actions.push("disable");
  } else {
    actions.push("enable");
  }

  // If the user is a vendor, handle ConfirmationStatus actions
  if (user.role === Role.vendor && user.vendor) {
    // Add all ConfirmationStatus options *except* the current one
    actions.push(
      ...Object.values(ConfirmationStatus).filter(
        (status) => status !== user.vendor!.status
      )
    );
  }

  return actions;
};

export default function UserTable({
  loading,
  users,
  handleDelete,
  handleAction,
}: UserTableProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-neutral-900">
                  {user.firstName + " " + user.lastName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">{user.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">
                  {getStatus(user).join("/")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={!loading}
                    className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    onClick={() => handleDelete(user)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>

                  <DropdownMenu
                    open={activeDropdown === user.id}
                    onOpenChange={(open) => {
                      if (open) {
                        setActiveDropdown(user.id);
                      } else {
                        setActiveDropdown(null);
                      }
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {getAdminActions(user).map((action, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() => {
                            setActiveDropdown(null);
                            handleAction(user, action);
                          }}
                        >
                          {action}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
