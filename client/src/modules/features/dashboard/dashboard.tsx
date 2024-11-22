import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { HeaderDashboard } from "./components/headear";

type ParamsType = {};
export const Dashboard = ({}: ParamsType) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="md:basis-2/12 ">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col bg-gray-100 md:ml-10">
        <HeaderDashboard />
        <main className="flex-1 px-5 md:px-16 pt-6 md:pt-9 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
