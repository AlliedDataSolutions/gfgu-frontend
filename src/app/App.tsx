import Footer from "@/components/ui/footer";
import { AppRouter } from "@/features/router";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* AppRouter handles the main content */}
      <div className="flex-1">
        <AppRouter />
      </div>

      {/* Footer sticks to the bottom */}
      <Footer />
      
    </div>
  );
}

export default App;
