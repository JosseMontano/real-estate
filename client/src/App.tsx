import { HomePage } from "@/features/home/home";
import { AuthPage } from "./modules/features/auth/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardPage from "@/features/profile/profile";
import Img360 from "@/features/img360/img360";
import { Config } from "@/shared/components/config";
import { Dashboard } from "@/core/components/dashboard/dashboard";
import { DashQuestions } from "@/features/dashQuestions/dashQuestions";
import { DashTypeRe } from "@/features/dashTypeRe/dashTypeRe";
import { DashRealEstates } from "@/features/dashRealEstates/dashRealEstates";
import { DashGraphics } from "@/features/dashGraphics/dashGraphics";
import { DashComments } from "@/features/dashComments/dashComments";
import { DashResponses } from "@/features/dashResponses/dashResponses";

export const queryClient = new QueryClient();
export type Routes =
  | "/"
  | "/profile"
  | "/auth"
  | "/img360"
  | "/dashboard/realEstates"
  | "/dashboard/typeRe"
  | "/dashboard/questions"
  | "/dashboard/comments"
  | "/dashboard/responses"
  | "/visit_user"
  ;

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<DashboardPage />} />
            <Route path="/visit_user" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset_password/:code/:email" element={<AuthPage />} />
            <Route path="/img360" element={<Img360 />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" element={<DashGraphics />} />
              <Route path="realEstates" element={<DashRealEstates />} />
              <Route path="typeRe" element={<DashTypeRe />} />
              <Route path="questions" element={<DashQuestions />} />
              <Route path="comments" element={<DashComments />} />
              <Route path="responses" element={<DashResponses />} />
            </Route>
          </Routes>
          <Config />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
