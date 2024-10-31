import { primaryColor } from "@/const/colors";
import Btn from "@/core/components/form/button";
import { NavLink } from "@/features/home/components/navLink";
import { useState } from "react";

type ParamsType = {};
export const Header = ({}: ParamsType) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    "Inicio",
    "Sobre nosotros",
    "Propiedades",
    "Agencias",
    "Blog",
    "Contactanos",
  ];
  return (
    <header className="text-white relative z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between md:items-center items-start">
        <div className="text-2xl font-bold hidden md:block">Oakberry</div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          <div className="text-2xl font-bold hidden md:block">Oakberry</div>
          {/* Icono de hamburguesa */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <nav
          className={`md:space-x-6 ${
            isMenuOpen ? "flex flex-col md:hidden" : "hidden md:block"
          } `}
        >
          {links.map((linkText, index) => (
            <NavLink key={index} href="#" primaryColor={primaryColor}>
              {linkText}
            </NavLink>
          ))}
        </nav>
        <div className="max-w-max">
          <Btn
            text="Enviar una propiedad"
            isPending={false}
            className="w-auto px-3 cursor-pointer "
          />
        </div>
      </div>
    </header>
  );
};
