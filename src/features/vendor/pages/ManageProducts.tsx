import { FC, useEffect, useState } from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { columns } from "../components/ProductGrid";
import AgGrid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download, Plus } from "lucide-react";
import { PencilLine, Trash2 } from "lucide-react";
import { useProductFilter } from "@/features/store/hooks/useProductFilter";
import { Product } from "@/components/models/type";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

const ManageProducts: FC = () => {
  const [colDef, setColDef] = useState<ColDef[]>([]);

  /* pagination */
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [records, setRecords] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(1);
  const navigate = useNavigate();

  const addProduct = () => {
    navigate(`${paths.vendor.addProduct.path}`);
  };

  const ActionRenderer: FC<ICellRendererParams> = ({ data }) => {
    return (
      <div
        className="flex gap-2 cursor-pointer"
      >
        <Button variant="ghost" size="icon">
          <PencilLine size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 size={20} className=" text-rose-600" />
        </Button>
      </div>
    );
  };

  useEffect(() => {
    columns.forEach((ele: ColDef) => {
      if (ele.field === "action") {
        ele.cellRenderer = ActionRenderer;
      }
    });
    setColDef(columns);
  }, []);


  const { filterProducts } = useProductFilter(
    '',
    '',
    page + 1,
    limit,
    0,
    1000
  );

  useEffect(() => {
    if (filterProducts) {
      setRecords(filterProducts.records);
      setTotalRecords(filterProducts.count);
    }
  }, [filterProducts]);

  return (
    <div className="p-4 space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="What are you looking for?"
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-1">
            <Filter size={16} /> Filter
          </Button>
          <Button variant="outline" className="flex gap-1">
            <Download size={16} /> Export
          </Button>
          <Button className="bg-brand-700 text-white flex gap-1"
            onClick={addProduct}
          >
            <Plus size={16} /> Add Product
          </Button>
        </div>
      </div>

      {/* Data Grid */}
      <div className="h-[calc(100vh-240px)] ag-theme-quartz mt-2 overflow-auto w-full">

        <AgGrid
          columnDefs={colDef}
          rowData={records}
          onPageChange={setPage}
          onLimitChange={setLimit}
          page={page}
          pageSize={limit}
          totalRecords={totalRecords}
        />

      </div>
    </div>
  );
};

export default ManageProducts;
