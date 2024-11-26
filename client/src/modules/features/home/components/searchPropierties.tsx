import { primaryColor } from "@/core/constants/colors";
import { useState } from "react";
import { SearchFormComponent } from "./searchFormComponent";
import { Field, OptionsType } from "../home";

interface Params {
  handleSelectChange: (value: OptionsType, index: number) => void;
  fields: Field[];
  handleSearch: () => void;
}

export const SearchPropierties = ({
  fields,
  handleSelectChange,
  handleSearch,
}: Params) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Versión computer */}
      <div className="hidden md:block">
        <SearchFormComponent
          fields={fields}
          isMobile={false}
          primaryColor={primaryColor}
          isOpen={false}
          handleSelectChange={handleSelectChange}
          handleSearch={handleSearch}
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
            handleSelectChange={handleSelectChange}
            handleSearch={handleSearch}
          />
        )}
      </div>
    </>
  );
};
