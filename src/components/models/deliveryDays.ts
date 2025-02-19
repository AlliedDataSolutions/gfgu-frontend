export interface DeliveryDay {
  location: string;
  dayOfWeek: string;
  timeOfDay?: string
}

export interface DeliveryDayProps {
  deliveryDays: DeliveryDay[];
}