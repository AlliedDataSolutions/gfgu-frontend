import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface UserDetailCardProps {
  user: any;
  orderAddress: any;
  children: React.ReactNode;
}

const UserDetailCard = ({ user, orderAddress, children }: UserDetailCardProps) => {
  const formattedAddress = orderAddress
    ? `${orderAddress.streetName}, ${orderAddress.town}, ${orderAddress.province} ${orderAddress.postalCode}`
    : "No address available";

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">
            {user.firstName} {user.lastName}
          </h4>
          <p className="text-sm text-muted-foreground">
            Email: {user.email}
            <br />
            Phone: {user.phoneNumber}
          </p>
          <p className="text-sm text-muted-foreground">
            Address: {formattedAddress}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserDetailCard;
