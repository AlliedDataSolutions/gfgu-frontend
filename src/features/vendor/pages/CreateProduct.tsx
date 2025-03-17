import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paths } from "@/config/paths";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ImageSection } from "../components/ImageSection";

interface Product {
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  category: string;
  images?: { id: string; url: string; file?: File }[];
}
import { useStore } from "@/features/store/hooks/useStore";
import { createProduct } from "../hooks/useProduct";

interface ProductInfoProps {
  onFormChange?: (field: string, value: string) => void;
}

export const CreateProduct: FC<ProductInfoProps> = ({ onFormChange }) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stockLevel: 0,
    category: "",
    images: [],
  });
  
  const { categories  } = useStore(); // Fetch categories from store

  // Transform categories data to match the Dropdown component's options format
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.type, // Display category type
  }));

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (onFormChange) {
  //     onFormChange(e.target.name, e.target.value);
  //   }
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    if (onFormChange) {
      onFormChange(name, value);
    }
  };
  

  // const handleDropdownChange = (field: string, value: string) => {
  //   if (onFormChange) {
  //     onFormChange(field, value);
  //   }
  // };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  
    if (onFormChange) {
      onFormChange(field, value);
    }
  };
  

  const handleImageUpload = (index: number, file: File) => {
    setFormData((prev) => {
      const newImages = [...(prev.images || [])];
      newImages[index] = {
        id: `${Date.now()}-${file.name}`,
        url: URL.createObjectURL(file),
        file: file
      };
      return {
        ...prev,
        images: newImages,
      };
    });
  };

  const handleSaveProduct = async () => {
    if (!formData) {
      alert("Please fill in all required fields.");
      return;
    }
  
    console.log("formData", formData);
  
    const productPayload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stockLevel: Number(formData.stockLevel),
      categoryIds: formData.category ? [formData.category] : [],
      imageUrls: ["https://5.imimg.com/data5/IY/BA/MY-19432744/green-chilly-250g-1000x1000.png","https://5.imimg.com/data5/IY/BA/MY-19432744/green-chilly-250g-1000x1000.png","https://5.imimg.com/data5/IY/BA/MY-19432744/green-chilly-250g-1000x1000.png"],
      // imageUrls: formData.images?.map((img) => img.url) || [],
    };
  
    const result = await createProduct(productPayload);
    if (result) {
      alert("Product created successfully!");
    }
  };
  

  return (
    <div>
      <div className="pb-2 container max-w-screen-xl mx-auto px-4">
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          <Link to={paths.vendor.products.getHref()} className="hover:underline">
            Products
          </Link>
          <span>/</span>
          <span className="font-bold">Add</span>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto w-full bg-white p-20 pt-10 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800">Product Information</h2>
        <div className="mt-6 space-y-4">
          <div>
            <Label className="text-gray-600">Product Name</Label>
            <Input
              type="text"
              placeholder="Enter Name"
              className="h-12"
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div>
            <Label className="text-gray-600">Product Description</Label>
            <Input
              type="text"
              placeholder="Enter Product Description"
              className="h-12"
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-600">Price</Label>
              <Input
                type="number"
                placeholder="Input Price"
                className="h-12"
                onChange={handleInputChange}
                name="price"
              />
            </div>
            <div>
              <Label className="text-gray-600">Quantity</Label>
              <Input
                type="number"
                placeholder="Enter Quantity"
                className="h-12"
                onChange={handleInputChange}
                name="stockLevel"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-600">Category</Label>
            <Dropdown
              label="Category"
              placeholder="Select Category"
              className="h-12"
              options={categoryOptions}
              onChange={(value) => handleDropdownChange("category", value)}
            />
          </div>

          <div>
            <Label className="text-gray-600">Product Status</Label>
            <Dropdown
              label="Product Status"
              placeholder="Select Status"
              className="h-12"
              options={statusOptions}
              onChange={(value) => handleDropdownChange("status", value)}
            />
          </div>
        </div>

        <ImageSection onImageUpload={handleImageUpload} />

        <div className="flex justify-end w-full mt-12 max-md:mt-10">
          <Button
            type="submit"
            className="w-[193px] max-w-full min-h-14 gap-2 overflow-hidden px-4 py-[18px] rounded-lg"
            onClick={handleSaveProduct}
          >
            Save Product
          </Button>
        </div>
      </div>
    </div>
  );
};
