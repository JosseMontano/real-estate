import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { HeaderDashboard } from "./headear";
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
      <div className="flex-1 flex flex-col px-6 bg-gray-100 lg:basis-10/12 overflow-x-auto gap-3">
        <HeaderDashboard />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
