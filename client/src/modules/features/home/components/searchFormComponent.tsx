import Btn from "@/core/components/form/button";
import { Field } from "./searchPropierties";

type ParamsType = {
  fields: Field[];
  isMobile: boolean;
  isOpen: Boolean;
  primaryColor: string;
};
export const SearchFormComponent = ({
  fields,
  isMobile,
  isOpen,
  primaryColor,
}: ParamsType) => {
  return (
    <section
      className={`container ${
        isMobile
          ? "bg-white shadow-md p-4 flex flex-col space-y-4"
          : "absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-7xl mx-auto bg-white shadow-md flex"
      } ${
        isMobile && isOpen
          ? "transition-all duration-500 ease-in-out overflow-hidden max-h-[1000px]"
          : ""
      }`}
    >
      <div
        className={`bg-white ${
          isMobile
            ? ""
            : "flex flex-col md:flex-row space-y-5 md:space-y-0 w-full"
        }`}
      >
        {fields.map(({ label, type, placeholder, options }, index) => (
          <div
            key={index}
            className={`flex-1 ${
              !isMobile ? "p-4 border-r-[1px] border-r-gray-400" : ""
            }`}
          >
            <label className="font-bold">{label}</label>
            {type === "text" ? (
              <input
                type="text"
                className="w-full px-4 py-1 my-3 border rounded-lg bg-gray-200 focus:outline-none"
                placeholder={placeholder}
                onFocus={(e) =>
                  !isMobile && (e.target.style.borderColor = primaryColor)
                }
                onBlur={(e) =>
                  !isMobile && (e.target.style.borderColor = "transparent")
                }
              />
            ) : (
              <select
                className="w-full px-4 py-[6px] my-3 border rounded-lg focus:outline-none"
                onFocus={(e) =>
                  !isMobile && (e.target.style.borderColor = primaryColor)
                }
                onBlur={(e) =>
                  !isMobile && (e.target.style.borderColor = "transparent")
                }
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
          className="md:rounded-none md:w-[200px] w-[100px]"
        />
      </div>
    </section>
  );
};
