// src/features/common/pages/EditName.tsx

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/core/axiosInstance";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/context/AuthContext";

const schema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
});

type NameForm = z.infer<typeof schema>;

export const EditName = () => {
  const navigate = useNavigate();
  const { fetchUserProfile } = useAuth();

  const form = useForm<NameForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: NameForm) => {
    try {
      await axiosInstance.put("/user/profile/name", data);
      await fetchUserProfile();
      toast.success("Name updated successfully");
      navigate(-1);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to update name";
      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormDescription>
          Update the name associated with your account.
        </FormDescription>

        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};
