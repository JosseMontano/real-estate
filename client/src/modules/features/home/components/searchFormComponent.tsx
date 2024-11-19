import { Field } from "./searchPropierties";
import { SearchIcon } from "@/shared/assets/icons/search";

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
      className={`container rounded-lg ${
        isMobile
          ? "bg-white shadow-md p-4 flex flex-col space-y-4"
          : "absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-3xl mx-auto bg-white shadow-md flex"
      } ${
        isMobile && isOpen
          ? "transition-all duration-500 ease-in-out overflow-hidden max-h-[1000px]"
          : ""
      } `}
    >
      <div
        className={` ${
          isMobile
            ? ""
            : "flex flex-col md:flex-row space-y-5 md:space-y-0 w-full "
        }`}
      >
        {fields.map(({ label, options }, index) => (
          <div
            key={index}
            className={`flex-1 p-[10px] ${
              !isMobile ? "border-r-[1px] border-r-gray-400" : ""
            }`}
          >
            <label className="font-bold">{label}</label>
            <select
              className="w-[100%] text-sm  px-2 py-[4px] border rounded-lg focus:outline-none"
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
          </div>
        ))}
        <div
          style={{ background: primaryColor }}
          className="w-[70px] rounded-r-lg flex items-center justify-center text-white"
        >
          <SearchIcon size="24" />
        </div>
      </div>
    </section>
  );
};
