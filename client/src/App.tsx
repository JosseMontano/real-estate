import { HomePage } from "@/features/home/home";
import { AuthPage } from "./modules/features/auth/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardPage from "@/features/profile/profile";
import Img360 from "@/features/img360/img360";
import { Config } from "@/shared/components/config";
import { Dashboard } from "@/features/dashboard/dashboard";
import { DashboardCustomers } from "@/features/dashboard/components/dashboardC/dashboardC";
import { DashboardProduct } from "@/features/dashboard/components/dashboardP/dashboardP";
import { DashboardIncome } from "@/features/dashboard/components/dashboardI/dashboardI";
import { DashboardGraphics } from "@/features/dashboard/components/dashboardGraphics/dashboardGraphics";
import { Side } from "@/features/dashboard/components/side";
import { DashQuestions } from "@/features/dashQuestions/dashQuestions";

export const queryClient = new QueryClient();
export type Routes = "/" | "/profile" | "/auth" | "/img360";

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/img360" element={<Img360 />} />
            <Route path="/side" element={<Side />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" element={<DashboardGraphics />} />
              <Route path="product" element={<DashboardProduct />} />
              <Route path="customers" element={<DashboardCustomers />} />
              <Route path="income" element={<DashboardIncome />} />
              <Route path="questions" element={<DashQuestions />} />
            </Route>
          </Routes>
          <Config />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
