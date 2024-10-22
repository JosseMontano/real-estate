import { AuthPage } from "./modules/features/auth/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/about" element={<p>xd</p>} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
