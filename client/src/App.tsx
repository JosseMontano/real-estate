import { HomePage } from "@/features/home/home";
import { AuthPage } from "./modules/features/auth/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardPage from "@/features/profile/profile";
import Img360 from "@/features/img360/img360";
import { Config } from "@/shared/components/config";

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
            <Route path="/img360/:url" element={<Img360 />} />
          </Routes>
          <Config />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
