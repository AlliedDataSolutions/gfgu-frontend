import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '@/core/axiosInstance';
import toast from 'react-hot-toast';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EmailForm {
  newEmail: string;
}

export const EditEmail = () => {
  const navigate = useNavigate();
  const form = useForm<EmailForm>({ defaultValues: { newEmail: '' } });
  const { control, handleSubmit } = form;

  const onSubmit = async (data: EmailForm) => {
    await axios.put('/user/profile/email', { newEmail: data.newEmail });
    toast.success('Email updated successfully');
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormDescription>
          Provide a new email address. We’ll send an OTP to confirm it.
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
