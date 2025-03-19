import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { paths } from "@/config/paths";
import { FC, useEffect } from "react";
import { ImageSection } from "../components/ImageSection";
import { useStore } from "@/features/store/hooks/useStore";
import { createProduct, updateProduct, getProductById } from "../hooks/useProduct";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast
import { uploadImage } from "../hooks/uploadImage";
import { ProductCategory } from "@/components/models/type";

interface ProductForm {
  id?: string;
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  category: string;
  images?: { id: string; url: string; file?: File }[];
  status: string;
}

export const CreateProduct: FC = () => {
  const { categories } = useStore();
  const navigate = useNavigate();
  const { id:productId } = useParams(); // Get product ID from URL params

  const form = useForm<ProductForm>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stockLevel: 0,
      status: "active",
      images: [],
    },
  });

  const { handleSubmit, setValue, control, watch } = form;

  useEffect(() => {
    if (productId && productId !== "null") {
      // Fetch product details for editing
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(productId);
          if (productData) {
            setValue("name", productData.name);
            setValue("description", productData.description);
            setValue("price", productData.price);
            setValue("stockLevel", productData.stockLevel);
            setValue("category", productData.categories.map((category:ProductCategory) => category.id)[0]);
            setValue("images", productData.images || []);
          }
        } catch (error) {
          toast.error("Failed to load product details");
        }
      };
      fetchProduct();
    }
  }, [productId, setValue]);

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.type,
  }));

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const handleImageUpload = (index: number, file: File) => {
    if(file && file.size > 2000000) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const formData = new FormData(); 
    formData.append("file", file);
    formData.append("upload_preset", "gfgu");

    // Upload image to cloudinary
    uploadImage("", formData)

  };

  const onSubmit = async (formData: ProductForm) => {
    const productPayload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stockLevel: Number(formData.stockLevel),
      categoryIds: formData.category ? [formData.category] : [],
      imageUrls: ["https://images.immediate.co.uk/production/volatile/sites/30/2020/08/fruit_and_veg-fcb7b38.jpg?quality=90&webp=true&resize=600,545"],
    };

    try {
      if (productId && productId !== "null") {
        await updateProduct(productId, productPayload);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(productPayload);
        toast.success("Product created successfully!");
      }

      navigate(paths.vendor.products.getHref());
    } catch (error) {
      toast.error("Something went wrong!");
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
          <span className="font-bold">{productId && productId !== "null" ? "Edit" : "Add"}</span>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto w-full bg-white p-20 pt-10 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800">{productId && productId !== "null" ? "Edit Product" : "Add Product"}</h2>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {/* Product Name */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Product Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price and Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Input Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="stockLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category Dropdown */}
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Dropdown
                      label="Category"
                      placeholder="Select Category"
                      options={categoryOptions}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Status Dropdown */}
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Status</FormLabel>
                  <FormControl>
                    <Dropdown
                      label="Product Status"
                      placeholder="Select Status"
                      options={statusOptions}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <ImageSection onImageUpload={handleImageUpload} />

            {/* Save Product Button */}
            <div className="flex justify-end w-full mt-12 max-md:mt-10">
              <Button type="submit" className="w-[193px] max-w-full min-h-14 gap-2">
                {productId && productId !== "null" ? "Update Product" : "Save Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
