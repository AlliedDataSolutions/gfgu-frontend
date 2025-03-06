import { AuthProvider } from "@/features/context/AuthContext";
import { AppRouter } from "@/features/router";
import { Toaster } from "react-hot-toast";

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
