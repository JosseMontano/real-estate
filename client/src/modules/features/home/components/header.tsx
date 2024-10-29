import { primaryColor } from "@/const/colors";
import Btn from "@/core/components/form/button";
import { NavLink } from "@/features/home/components/navLink";

type ParamsType = {};
export const Header = ({}: ParamsType) => {
  const links = [
    "Inicio",
    "Sobre nosotros",
    "Propiedades",
    "Agencias",
    "Blog",
    "Contactanos",
  ];
  return (
    <header className="text-white relative z-10 ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Oakberry</div>
        <nav className="space-x-6">
          {links.map((linkText, index) => (
            <NavLink key={index} href="#" primaryColor={primaryColor}>
              {linkText}
            </NavLink>
          ))}
        </nav>
        <Btn text="Enviar una propiendad" isPending={false} className="w-auto px-3 cursor-pointer" />
      </div>
     
    </header>
  );
};
