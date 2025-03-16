import { AuthProvider } from "@/features/context/AuthContext";
import { AppRouter } from "@/features/router";
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
        <AppRouter />
      </AuthProvider>
      <Toaster />
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
