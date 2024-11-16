import { primaryColor } from "@/const/colors";
import { useState } from "react";
import { SearchFormComponent } from "./searchFormComponent";

export type Field = {
  label: string;
  type: "text" | "select";
  placeholder?: string;
  options?: string[];
};
type ParamsType = {};
export const SearchPropierties = ({}: ParamsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  const fields: Field[] = [
    {
      label: "Tipo de propiedad",
      type: "select",
      options: ["Seleccione la propiedad","Residencial", "Soltero", "Commercial", "Casado", "Viudo"],
    },
    {
      label: "Ubicación",
      type: "select",
      options: ["Seleccione la ubicacion","Queru queru", "Cala cala", "Prado", "Bulevar"],
    },
    {
      label: "Limites de precio",
      type: "select",
      options: ["Seleccione el precio","1000Bs", "1500Bs", "2000Bs", "2500Bs"],
    },
  ];
  return (
    <>
      {/* Versión computer */}
      <div className="hidden md:block">
        <SearchFormComponent
          fields={fields}
          isMobile={false}
          primaryColor={primaryColor}
          isOpen={false}
        />
      </div>

      {/* Versión móvile */}
      <div className="relative md:hidden">
        <button
          onClick={toggleForm}
          style={{ background: primaryColor }}
          className=" text-white py-2 rounded-lg hover:opacity-90 border-none focus:outline-none"
        >
          <label className="p-3">Buscar propiedades</label>
        </button>
        {isOpen && (
          <SearchFormComponent
            fields={fields}
            isMobile={true}
            isOpen={isOpen}
            primaryColor={primaryColor}
          />
        )}
      </div>
    </>
  );
};
