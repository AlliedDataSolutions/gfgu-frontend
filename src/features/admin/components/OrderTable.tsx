import { useState } from "react";
import React from 'react';
import { format } from "date-fns";
import { Trash2, MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDetailCard from "./UserDetailCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface OrderTableProps {
  loading: boolean;
  orders: any[];
  handleDelete: (order: any) => void;
  handleAction: (orderLineId: string, action: string) => void;
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

const OrderLine = ({ orderLine, handleAction, loading }: { orderLine: any; handleAction: any, loading: boolean }) => {
  return (
    <tr key={orderLine.id} className="hover:bg-neutral-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-neutral-900 flex items-center gap-1">
          {orderLine.id.slice(-12)}
          <button className="text-sm p-1 rounded-md hover:bg-neutral-200" onClick={() => navigator.clipboard.writeText(orderLine.id)}>
            <span>Copy</span>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">{orderLine.product.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">{orderLine.quantity}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">{format(new Date(orderLine.createdDate), "MMM dd, yyyy 'at' hh:mm a")}</div>
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
              {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((action, index) => (
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
}

export default function OrderTable({
  loading,
  orders,
  handleDelete,
  handleAction,
}: OrderTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
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
                  <div className="text-sm font-medium text-neutral-900 flex items-center gap-1">
                    {order.id.slice(-12)}
                    <button className="text-sm p-1 rounded-md hover:bg-neutral-200" onClick={() => navigator.clipboard.writeText(order.id)}>
                      <span>Copy</span>
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">
                    <Link to={`/admin/users/${order.user.id}`}>
                      {order.user.firstName} {order.user.lastName}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">{format(new Date(order.orderDate), "MMM dd, yyyy 'at' hh:mm a")}</div>
                </td>
                 <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">{order.requiredDate ? format(new Date(order.requiredDate), "MMM dd, yyyy 'at' hh:mm a") : ''}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm ">{order.shippedDate ? format(new Date(order.shippedDate), "MMM dd, yyyy 'at' hh:mm a") : ''}</div>
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
                      {expandedRow === order.id ? <ChevronUp /> : <ChevronDown />}
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
                          <OrderLine key={orderLine.id} orderLine={orderLine} handleAction={handleAction} loading={loading} />
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
