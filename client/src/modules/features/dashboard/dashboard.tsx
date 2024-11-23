import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { HeaderDashboard } from "./components/headear";

type ParamsType = {};
export const Dashboard = ({}: ParamsType) => {
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
