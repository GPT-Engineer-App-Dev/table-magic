import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home, Upload } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Updated to use sidebar layout
import Index from "./pages/Index.jsx";
import CsvTool from "./pages/CsvTool.jsx"; // Import the new CSV tool page

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home", // Feel free to change this to your liking
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
{
    title: "CSV Tool", // New navigation item
    to: "/csv-tool",
    icon: <Upload className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="csv-tool" element={<CsvTool />} /> {/* New route */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
