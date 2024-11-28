import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { HeaderDashboard } from "./components/headear";
import useAuthStore from "@/core/store/auth";
import { useEffect } from "react";
import useNavigation from "@/core/hooks/useNavigate";

type ParamsType = {};
export const Dashboard = ({}: ParamsType) => {
  const { user } = useAuthStore();
  const { handleNavigate } = useNavigation();
  useEffect(() => {
    if (!user.email == undefined) {
      handleNavigate("/auth");
    }
    if (user.role != 1) {
      handleNavigate("/auth");
    }
  }, [user]);

  return (
    <div className="flex flex-col lg:flex-row h-screen  ">
      <div className="lg:basis-2/12  max-h-screen ">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col bg-gray-100 lg:basis-10/12 overflow-x-auto ">
        <HeaderDashboard />
        <main className="flex-1 px-5 md:px-16 pt-6 md:pt-9 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
