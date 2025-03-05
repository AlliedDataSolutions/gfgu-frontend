import { AppRouter } from "@/features/router";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
      <AppRouter />;
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
