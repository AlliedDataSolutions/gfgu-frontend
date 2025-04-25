import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "../../../components/ui/button";
import { Trash2 } from "lucide-react";

interface DeliveryDay {
  id: string;
  city: string;
  deliveryday: string;
  time: string | null;
}

interface DeliveryDaysTableProps {
  deliveryDays: DeliveryDay[];
  deleteDeliveryDay: (id: string) => void;
  onGridReady: (params: any) => void;
}

const DeliveryDaysTable: React.FC<DeliveryDaysTableProps> = ({
  deliveryDays,
  deleteDeliveryDay,
  onGridReady,
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const [columnDefs] = useState([
    {
      headerName: "ID",
      field: "id",
      sortable: true,
      filter: false,
    },
    { headerName: "City", field: "city", sortable: true, filter: true },
    {
      headerName: "Delivery Day",
      field: "deliveryday",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <Button
          variant="ghost"
          size="icon"
          className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
          onClick={() => {
            deleteDeliveryDay(params.data.id);
          }}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      ),
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
    }),
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={deliveryDays}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default DeliveryDaysTable;
