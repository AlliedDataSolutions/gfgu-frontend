import { ColDef } from "ag-grid-community";

export const columns: ColDef[] = [
  {
    field: "name",
    headerName: "Product Name",
    filter: true,
    flex: 1,  // Allow column to grow
  },
  {
    field: "price",
    headerName: "Price",
    filter: true,
    flex: 1,
  },
  {
    field: "stockLevel",
    headerName: "Qty",
    filter: true,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    filter: true,
    flex: 1,
    cellRenderer: (params: any) => {
      const inStock = params.data.stockLevel > 0;
      return (
        <span style={{ color: inStock ? "green" : "red", fontWeight: "bold" }}>
          {inStock ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
  },
];

