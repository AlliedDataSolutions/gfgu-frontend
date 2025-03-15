import { AuthProvider } from "@/features/context/AuthContext";
import { AppRouter } from "@/features/router";
import { Toaster } from "react-hot-toast";
import { CartDataProvider } from "@/features/store/hooks/useCart";
function App() {
  return (
    <div>
      <CartDataProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <Toaster />
      </CartDataProvider>
    </div>
  );
}

export default App;

// Uncomment code below to test new components
// import TestComponents from "./TestComponents";

// function App() {
//   return (
//     <>
//       <TestComponents />
//     </>
//   );
// }

// export default App;
