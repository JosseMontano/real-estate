import useNavigation from "@/core/hooks/useNavigate";
import { useLanguageStore } from "@/core/store/language";
import { DashboardIcon } from "@/shared/assets/icons/dasboard";
import { MenuIcon } from "@/shared/assets/icons/menu";
import { useState } from "react";
import { Link } from "react-router-dom";

type ParamsType = {};
export const Sidebar = ({}: ParamsType) => {
  const { texts } = useLanguageStore();
  const { location } = useNavigation();

  const links = [
    { path: "/dashboard/realEstates", label: texts.properties },
    { path: "/dashboard/typeRe", label: texts.propertyType },
    { path: "/dashboard/questions", label: texts.questions },
    { path: "/dashboard/comments", label: texts.comments },
    { path: "/dashboard/responses", label: texts.responses },
    { path: "/dashboard/reports", label: texts.reports },
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  console.log(location);
  return (
    <>
      <div
        onClick={toggleSidebar}
        className="absolute  lg:hidden  my-5  mx-3  top-0 left-4 z-50 cursor-pointer"
      >
        <MenuIcon size="20" />
      </div>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-5"
        ></div>
      )}
      <aside
        className={`fixed lg:static z-1 bg-white h-screen p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        } lg:translate-x-0 lg:block `}
      >
        <div className="mb-7 mt-5 lg:mt-0 px-3">
          <Link to="" className="text-3xl font-semibold">
            {"InmoApp"}
          </Link>
        </div>

        <nav className="flex flex-col gap-3">
          {links.map((link, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-2 ${
                location == link.path
                  ? "bg-[#5932ea] text-white font-semibold"
                  : ""
              }`}
            >
              <DashboardIcon size="18" />
              <Link
                to={link.path}
                className={`text-gray-600 text-xl ${
                  location == link.path ? "text-white" : ""
                }`}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
