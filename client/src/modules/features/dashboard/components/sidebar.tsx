import { useLanguageStore } from "@/core/store/language";
import { DashboardIcon } from "@/shared/assets/icons/dasboard";
import { MenuIcon } from "@/shared/assets/icons/menu";
import { useState } from "react";
import { Link } from "react-router-dom";

type ParamsType = {};
export const Sidebar = ({}: ParamsType) => {
  const { texts, language } = useLanguageStore();
  const links = [
    { path: "/dashboard/realEstates", label: texts.properties },
    { path: "/dashboard/typeRe", label: texts.propertyType },
    { path: "/dashboard/questions", label: texts.questions },
    { path: "/dashboard/comments", label: "Comentarios" },
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        onClick={toggleSidebar}
        className="absolute  lg:hidden  my-5  mx-3  top-0 left-4 z-50 cursor-pointer"
      >
        <MenuIcon size="20" />
      </div>

      <aside
        className={`fixed bg-white h-screen p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block `}
      >
        <div className="mb-14 mt-5 lg:mt-0">
          <Link to="" className="text-3xl font-semibold">
            {language === "es" || language === "en" ? "Dashboard" : "Painel"}
          </Link>
        </div>

        <nav className="space-y-4 flex flex-col gap-3">
          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <DashboardIcon size="18" />
              <Link
                to={link.path}
                className="text-gray-600 hover:text-purple-500 text-xl"
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
