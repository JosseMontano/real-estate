import { primaryColor } from "@/const/colors";
import Btn from "@/core/components/form/button";
import { useState } from "react";

type ParamsType = {};
export const SearchPropierties = ({}: ParamsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  const fields = [
    {
      label: "Ingresa alguna palabra",
      type: "text",
      placeholder: "3 dormitorios",
    },
    {
      label: "Tipo de propiedad",
      type: "select",
      options: ["Residencial", "Soltero", "Commercial", "Casado", "Viudo"],
    },
    {
      label: "Ubicación",
      type: "select",
      options: ["Queru queru", "Cala cala", "Prado", "Bulevar"],
    },
    {
      label: "Limites de precio",
      type: "select",
      options: ["1000Bs", "1500Bs", "2000Bs", "2500Bs"],
    },
  ];
  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Buscar propiedades
      </button>

      <section
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="container bg-white shadow-md p-4 flex flex-col space-y-4">
          {fields.map(({ label, type, placeholder, options }, index) => (
            <div key={index} className="flex-1">
              <label className="font-bold">{label}</label>
              {type === "text" ? (
                <input
                  type="text"
                  className="w-full px-4 py-1 my-3 border rounded-lg bg-gray-200 focus:outline-none"
                  placeholder={placeholder}
                />
              ) : (
                <select className="w-full px-4 py-1 my-3 border rounded-lg focus:outline-none">
                  {options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Buscar
          </button>
        </div>
      </section>
    </div>
  );
};
