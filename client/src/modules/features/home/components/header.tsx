import { primaryColor } from "@/const/colors";
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
    <header className="text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Oakberry</div>
        <nav className="space-x-6">
          {links.map((linkText, index) => (
            <NavLink key={index} href="#" primaryColor={primaryColor}>
              {linkText}
            </NavLink>
          ))}
        </nav>
        <button
          className="text-white px-4 py-2 rounded"
          style={{ background: primaryColor }}
        >
          Enviar un propiedad
        </button>
      </div>
    </header>
  );
};
