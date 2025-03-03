import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header"; 
//import checkout from database
//if no items in cart, display empty cart message
//import product info from product catalog

export const CheckoutPage = () => {
  return (
    <>
      <Header menuItems={menuItems} />
      <Footer menuItems={menuItems} />
    </>
  );
};


const menuItems = [
  { name: "Home", href: "#home" },
  { name: "Store", href: "#store" },
];