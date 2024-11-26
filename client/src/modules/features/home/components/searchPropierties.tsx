import { primaryColor } from "@/core/constants/colors";
import { useState } from "react";
import { SearchFormComponent } from "./searchFormComponent";
import { Zone } from "../types/zones";

type ParamsType={
tipeProperty:string,
selectProperty:string,
ubication:string,
selectUbi:string,
limitPrice:string,
selecPrice:string
zones: Zone[]
}
export type Field = {
  label: string;
  type: "text" | "select";
  placeholder?: string;
  options?: string[];

};

export const SearchPropierties = ({zones,limitPrice, selectProperty, selecPrice, selectUbi, tipeProperty, ubication}:ParamsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const zonesOptions = zones.map((zone) => zone.name);

  const fields: Field[] = [
    {
      label: tipeProperty,
      type: "select",
      options: [selectProperty,"Residencial", "Soltero", "Commercial", "Casado", "Viudo"],
    },
    {
      label: ubication,
      type: "select",
      options: [selectUbi,...zonesOptions],
    },
    {
      label: limitPrice,
      type: "select",
      options: [selecPrice,"1000Bs", "1500Bs", "2000Bs", "2500Bs"],
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
          className=" text-white py-2 rounded-lg hover:opacity-90 border-none focus:outline-none relative top-16"
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
