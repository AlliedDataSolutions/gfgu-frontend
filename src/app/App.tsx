import { AuthProvider } from "@/features/context/AuthContext";
import { AppRouter } from "@/features/router";
import { CartProvider } from "@/features/store/hooks/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
