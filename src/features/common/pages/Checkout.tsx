import Footer from "@/components/ui/footer";
import Header from "@/components/ui/Header"; //don't know why this Header isn't header but it gives me an error if I change it

//import cart from database
//if no items in cart, display empty cart message
//import product info from product catalog

export const Cart = () => {
  return (
    <>
      <Header menuItems={menuItems} />
      <Footer menuItems={menuItems} />
    </>
  );
};

//cart logic here

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "Store", href: "#store" },
];