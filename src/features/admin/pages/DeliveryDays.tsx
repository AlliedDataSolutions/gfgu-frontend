import useDeliveryDays from "../hooks/useDeliveryDays";
import DeliveryDaysTable from "../components/DeliveryDaysTable";
import CreateDeliveryDayDialog from "../components/CreateDeliveryDayDialog";

const DeliveryDays = () => {
  const { data: deliveryDays, loading, deleteDeliveryDay, createDeliveryDay } = useDeliveryDays();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <CreateDeliveryDayDialog createDeliveryDay={createDeliveryDay} />
      </div>
      <DeliveryDaysTable deliveryDays={deliveryDays} deleteDeliveryDay={deleteDeliveryDay} />
    </div>
  );
};

export default DeliveryDays;
