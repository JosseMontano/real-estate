import { primaryColor } from "@/const/colors";
import Btn from "@/core/components/form/button";

type ParamsType = {};
export const SearchPropierties = ({}: ParamsType) => {
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
    <section className="container absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-7xl mx-auto bg-white shadow-md flex">
      <div
        className={`bg-white flex flex-col md:flex-row space-y-5 md:space-y-0  w-full`}
      >
        {fields.map(({ label, type, placeholder, options }, index) => (
          <div
            key={index}
            className="flex-1 p-4 border-r-[1px] border-r-gray-400"
          >
            <label className="font-bold">{label}</label>
            {type === "text" ? (
              <input
                type="text"
                className="w-full px-4 py-1 my-3 border rounded-lg bg-gray-200 focus:outline-none"
                placeholder={placeholder}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
            ) : (
              <select
                className="w-full px-4 py-[6px] my-3 border rounded-lg focus:outline-none"
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              >
                {options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        <Btn
          text="Buscar"
          isPending={false}
          className="w-[200px] rounded-none"
        ></Btn>
      </div>
    </section>
  );
};
