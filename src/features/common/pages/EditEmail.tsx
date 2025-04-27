// src/features/common/pages/EditEmail.tsx

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
  newEmail: z.string().email("Invalid email format"),
});

type EmailForm = z.infer<typeof schema>;

export const EditEmail = () => {
  const navigate = useNavigate();
  const { fetchUserProfile } = useAuth();

  const form = useForm<EmailForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: EmailForm) => {
    try {
      await axiosInstance.put("/user/profile/email", { newEmail: data.newEmail });
      await fetchUserProfile();
      toast.success("Email updated successfully");
      navigate(-1);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to update email";
      toast.error(message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormDescription>
          Provide a new email address. An OTP will be sent to confirm it.
        </FormDescription>

        <FormField
          control={control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
};
