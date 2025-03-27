import { useState } from "react";
import React from "react";
import {
  MoreVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDetailCard from "./UserDetailCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import axiosInstance from "@/core/axiosInstance";

interface OrderTableProps {
  loading: boolean;
  orders: any[];
  handleDelete: (order: any) => void;
  handleAction: (orderLineId: string, action: string) => void;
  fetchOrders: () => Promise<void>;
}

const getStatus = (order: any): string[] => {
  let actions: string[] = [];
  actions.push(order.status);
  return actions;
};

const getAdminActions = (order: any): string[] => {
  let actions: string[] = [];

  if (order.status === "pending") {
    actions.push("confirm");
  } else {
    actions.push("pending");
  }
  return actions;
};

const OrderLine = ({
  orderLine,
  handleAction,
  loading,
}: {
  orderLine: any;
  handleAction: any;
  loading: boolean;
}) => {
  return (
    <tr key={orderLine.id} className="hover:bg-neutral-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-neutral-900">
          {orderLine.id.slice(-12)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">{orderLine.product.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">{orderLine.quantity}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">{formatDate(orderLine.createdDate)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">{orderLine.unitPrice}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">{orderLine.status}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center gap-2 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
              ].map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => {
                    handleAction(orderLine.id, action);
                  }}
                  disabled={loading}
                >
                  {action}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};

export default function OrderTable({
  loading,
  orders,
  handleDelete,
  handleAction,
  fetchOrders,
}: OrderTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const updateOrderLineStatus = async (orderLineId: string, status: string) => {
    try {
      setUpdatingStatus(true);
      await axiosInstance.put(`/admin/update-order`, { orderLineId, status });
      await fetchOrders();
    } catch (error) {
      console.error("Error updating order line status:", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full table-auto">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Order Date
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Required Date
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Shipped Date
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <tr className="hover:bg-neutral-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">
                    {order.id.slice(-12)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">
                    <UserDetailCard
                      user={order.user}
                      orderAddress={order.orderAddress}
                    >
                      {order.user.firstName} {order.user.lastName}
                    </UserDetailCard>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">{formatDate(order.orderDate)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">
                    {order.requiredDate ? formatDate(order.requiredDate) : ""}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">
                    {order.shippedDate ? formatDate(order.shippedDate) : ""}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">{order.status}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRow(order.id)}
                    >
                      {expandedRow === order.id ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
              {expandedRow === order.id && (
                <tr>
                  <td colSpan={6}>
                    <table className="w-full">
                      <thead className="bg-neutral-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            OrderLineId
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Product name
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Order date
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-200">
                        {order.orderLines.map((orderLine: any) => (
                          <OrderLine
                            key={orderLine.id}
                            orderLine={orderLine}
                            handleAction={handleAction}
                            loading={loading}
                          />
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
