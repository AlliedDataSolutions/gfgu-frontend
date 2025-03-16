import { ColDef } from "ag-grid-community";

export const columns: ColDef[] = [
  {
    field: "name",
    headerName: "Product Name",
    filter: true,
  },
  {
    field: "price",
    headerName: "Price",
    filter: true,
  },
  {
    field: "stockLevel",
    headerName: "Qty",
    filter: true,
  },
{
  field: "status",
  headerName: "Status",
  filter: true,
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
  },
];
