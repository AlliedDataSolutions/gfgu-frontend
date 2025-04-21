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

interface NameForm {
  firstName: string;
  lastName: string;
}

export const EditName = () => {
  const navigate = useNavigate();
  const form = useForm<NameForm>({
    defaultValues: { firstName: '', lastName: '' },
  });
  const { control, handleSubmit } = form;

  const onSubmit = async (data: NameForm) => {
    await axios.put('/user/profile/name', {
      firstName: data.firstName,
      lastName: data.lastName,
    });
    toast.success('Name updated successfully');
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormDescription>
          Enter the name you want displayed on your account. Click Save Changes when done.
        </FormDescription>

        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
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
