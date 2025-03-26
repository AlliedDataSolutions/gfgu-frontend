import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface UserDetailCardProps {
  user: any;
  orderAddress: any;
}

const UserDetailCard = ({ user, orderAddress }: UserDetailCardProps) => {
  const formattedAddress = orderAddress
    ? `${orderAddress.street}, ${orderAddress.city}, ${orderAddress.state} ${orderAddress.zip}`
    : "No address available";

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        {user.firstName} {user.lastName}
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
