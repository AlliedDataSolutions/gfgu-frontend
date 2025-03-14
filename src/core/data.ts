import { paths } from "@/config/paths";

export const deliveryDays = [
  { location: "edmonton", dayOfWeek: "Wednessday" },
  { location: "calgary", dayOfWeek: "Tuesday" },
  { location: "lethbridge", dayOfWeek: "Thursday" },
  { location: "airdrie", dayOfWeek: "Friday" },
];

export const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Delivery Days", href: "#deliveryDays" },
  { name: "Contact", href: "#contact" },
];


export const storeMenuItems = [
    { name: "Home", href: `${paths.store.home.path}` },
    { name: "Store", href: `${paths.store.listing.path}` },
  ];