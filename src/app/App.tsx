import { AuthProvider } from "@/features/context/AuthContext";
import { AppRouter } from "@/features/router";
import { CartProvider } from "@/features/store/hooks/CartContext";
import { Toaster } from "react-hot-toast";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {

  AllCommunityModule,

  ModuleRegistry,

  provideGlobalGridOptions,

} from "ag-grid-community";

// Register all community features

ModuleRegistry.registerModules([AllCommunityModule]);

// Mark all grids as using legacy themes

provideGlobalGridOptions({ theme: "legacy" });

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
