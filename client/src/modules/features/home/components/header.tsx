import { primaryColor } from "@/core/const/colors";
import Btn from "@/core/components/form/button";
import useNavigation from "@/core/hooks/useNavigate";
import { NavLink } from "@/features/home/components/navLink";
import { useEffect, useState } from "react";

type ParamsType = {};
export const Header = ({}: ParamsType) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = ["Inicio", "Propiedades", "Peguntas", "Contactanos"];
  const { handleNavigate } = useNavigation();


  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
    className={`fixed w-full top-0 z-10  transition-colors duration-300 ${
      isScrolled ? "bg-black text-white" : "bg-transparent text-white "
    }`}
  >
      <div className=" container mx-auto px-4 py-4 flex justify-between md:items-center items-start">
        <div className="text-2xl font-bold hidden md:block">InmoApp</div>
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
            text="Publicar propiedad"
            isPending={false}
            className="w-auto px-3 cursor-pointer"
            onClick={() => handleNavigate("/profile")}
          />
        </div>
      </div>
    </header>
  );
};
