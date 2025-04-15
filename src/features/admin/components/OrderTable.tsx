import { useState } from "react";
import React from "react";
import { MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDetailCard from "./UserDetailCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";

interface OrderTableProps {
  loading: boolean;
  orders: any[];
  handleAction: (orderLineId: string, action: string) => void;
}

const getStatusMessage = (status: any): string => {
  let messageStatus = "";
  if (status == "offlinePayment") {
    messageStatus = "Unconfirmed payment";
  } else {
    messageStatus = status;
  }

  return messageStatus;
};

const getAdminActions = (status: string): string[] => {
  let actions: string[] = [];

  if (status === "offlinePayment") {
    actions.push("confirm");
    actions.push("shipped");
    actions.push("delivered");
    actions.push("canceled");
  } else if (status === "confirmed") {
    // actions.push("pending"); is there a case an order is taken back to pending?
    actions.push("shipped");
    actions.push("delivered");
    actions.push("canceled");
  } else if (status === "shipped") {
    actions.push("delivered");
    actions.push("canceled");
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
        <div className="text-sm ">{getStatusMessage(orderLine.status)}</div>
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
              {getAdminActions(orderLine.status).map((action, index) => (
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
          {orders?.map((order) => (
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
                  <div className="text-sm ">
                    {getStatusMessage(order.status)}
                  </div>
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
