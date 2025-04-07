import { FC, useEffect, useState } from "react";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { columns } from "../components/ProductGrid";
import AgGrid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download, Plus } from "lucide-react";
import { PencilLine, Trash2 } from "lucide-react";
import { Product } from "@/components/models/type";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { deleteProduct } from "../hooks/useProduct"; // Import deleteProduct
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/features/store/hooks/useStore";
import { useProductFilter } from "@/features/store/hooks/useProductFilter";

const ManageProducts: FC = () => {
  const [colDef, setColDef] = useState<ColDef[]>([]);

  /* pagination */
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [records, setRecords] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(1);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [vendorId, setvendorId] = useState<string>('');
  const { vendors } = useStore();

  const addProduct = () => {
    navigate(`${paths.vendor.addProduct.path}/null`);
  };

  const editProduct = (id: string) => {
    navigate(`${paths.vendor.addProduct.path}/${id}`);
  };

  // Handler to delete a product
  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    try {
      // await deleteProduct(id);
      const deleteProd = await deleteProduct(id);
      // Update local state to remove the deleted product from the grid
      if(deleteProd && deleteProd.message){
      setRecords((prevRecords) => prevRecords.filter((product) => product.id !== id));
      toast.success(deleteProd.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Custom Action Renderer including edit and delete buttons
  const ActionRenderer: FC<ICellRendererParams> = ({ data }) => {
    return (
      <div
        className="flex gap-2 cursor-pointer"
      >
        <Button variant="ghost" size="icon" onClick={() => editProduct(data.id)}>
          <PencilLine size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(data.id)}>
          <Trash2 size={20} className="text-rose-600" />
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
    vendorId,
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

  const isVendor = Boolean(localStorage.getItem("vendorId"));

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
          <Button variant="outline" className="flex gap-1" disabled>
            <Download size={16} /> Export
          </Button>
          {isVendor ? (
            <>
              <Button variant="outline" className="flex gap-1" disabled>
                <Filter size={16} /> Filter
              </Button>
              <Button
                className="bg-brand-700 text-white flex gap-1"
                onClick={addProduct}
              >
                <Plus size={16} /> Add Product
              </Button>
            </>
          ) : (
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter size={16} /> Filter Vendor
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {vendors?.map((vendor, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => {
                      setvendorId(vendor.id);
                    }}
                  >
                    {vendor.businessName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Data Grid */}
      <div className="h-[calc(100vh-240px)] ag-theme-quartz mt-2 overflow-auto w-full">
        <AgGrid
          columnDefs={colDef}
          rowData={records}
          page={page}
          pageSize={limit}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </div>
    </div>
  );
};

export default ManageProducts;
