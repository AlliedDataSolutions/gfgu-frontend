import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Copy } from "lucide-react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { Pagination } from "@/components/ui/pagination";
import { formatDate } from "@/lib/utils";

interface Transaction {
  id: string;
  amount: string;
  type: string;
  adminId: string | null;
  participantType: string;
  orderLineId: string;
  createdAt: string;
  vendor: {
    id: string;
    businessName: string;
    businessDescription: string | null;
    status: string;
  };
}

interface TransactionTableProps {
  transactions: Transaction[];
  count: number;
  onPageChange: (skip: number, take: number) => void;
  take: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  count,
  onPageChange,
  take,
}) => {
  const [_, setGridApi] = useState(null);

  const onGridReady = useCallback((params: any) => {
    setGridApi(params.api);
  }, []);

  const handleCopyClick = (orderlineId: string) => {
    navigator.clipboard.writeText(orderlineId);
  };

  const idCellRenderer = (params: ICellRendererParams<Transaction, any>) => {
    const id = params.value;
    return id ? id.substring(0, 12) : "";
  };

  const orderlineIdCellRenderer = (
    params: ICellRendererParams<Transaction, any>
  ) => {
    const orderlineId = params.value;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {orderlineId ? orderlineId.substring(0, 12) : ""}
        <Copy
          onClick={() => handleCopyClick(orderlineId)}
          style={{ marginLeft: "5px", cursor: "pointer" }}
          size={16}
        />
      </div>
    );
  };

  const dateFormatter = (params: ICellRendererParams<Transaction, any>) => {
    const date = params.value;
    return formatDate(date);
  };

  const columnDefs: ColDef<Transaction>[] = [
    { headerName: "ID", field: "id", cellRenderer: idCellRenderer },
    {
      headerName: "Orderline ID",
      field: "orderLineId",
      cellRenderer: orderlineIdCellRenderer,
    },
    { headerName: "Amount", field: "amount" },
    { headerName: "Type", field: "type" },
    {
      headerName: "Created Date",
      field: "createdAt",
      cellRenderer: dateFormatter,
    },
  ];

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected;
    const skip = selectedPage * take;
    onPageChange(skip, take);
  };

  const pageCount = Math.ceil(count / take);

  return (
    <div>
      <div className="h-[calc(100vh-240px)] ag-theme-quartz overflow-auto w-full">
        <AgGridReact
          rowData={transactions}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
        />
      </div>
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </div>
  );
};

export default TransactionTable;
