import { HomePage } from "@/features/home/home";
import { AuthPage } from "./modules/features/auth/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from 'sonner'

export const queryClient = new QueryClient();

function App() {
  return (
    <>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    </>
  );
}

export default App;
