import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header"; 
import { menuItems, storeMenuItems } from "@/core/data";
//import checkout from database
//if no items in cart, display empty cart message
//import product info from product catalog

export const CheckoutPage = () => {
  return (
    <>
      <Header menuItems={storeMenuItems} />
      <Footer menuItems={menuItems} />
    </>
  );
};
