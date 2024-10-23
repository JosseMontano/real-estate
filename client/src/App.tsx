import { HomePage } from "@/features/home/home";
import { AuthPage } from "./modules/features/auth/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'sonner'
import DashboardPage from "@/features/dashboard/dashboard";

export const queryClient = new QueryClient();
export type Routes = "/" | "/dashboard" | "/auth";

function App() {
  return (
    <>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    </>
  );
}

export default App;
