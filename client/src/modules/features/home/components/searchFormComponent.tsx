import { SearchIcon } from "@/shared/assets/icons/search";
import { Field, OptionsType } from "../home";
import { TrashIcon } from "@/shared/assets/icons/trash";

type ParamsType = {
  fields: Field[];
  primaryColor: string;
  handleSelectChange: (value: OptionsType, index: number) => void;
  handleSearch: () => void;
  handleCleanSearch: () => void;
  selectedValues: OptionsType[];
};
export const SearchFormComponent = ({
  fields,
  primaryColor,
  handleSelectChange,
  handleSearch,
  handleCleanSearch,
  selectedValues,
}: ParamsType) => {
  return (
    <section
      className={`container rounded-lg 
         absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-2xl lg:max-w-3xl bg-white shadow-md flex`}
    >
      <div className={`flex flex-row items-center md:space-y-0 w-full`}>
        {fields.map(
          ({ label, options }, index) =>
            options && (
              <div key={index} className={`flex-1 p-[10px] text-left`}>
                <label className="font-bold">{label}</label>
                <select
                  className="w-[100%] text-sm px-2 py-[4px] border rounded-lg focus:outline-none"
                  value={selectedValues[index]?.id || ""}
                  onChange={(e) =>
                    handleSelectChange(
                      //@ts-ignore
                      options.find((opt) => opt.id === Number(e.target.value)),
                      index
                    )
                  }
                  onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                  onBlur={(e) => (e.target.style.borderColor = "transparent")}
                >
                  {options.map((option) => (
                    <option value={option.id} key={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            )
        )}
  {/*          <div
          style={{ background: primaryColor }}
          className="w-[70px] h-full rounded-r-lg flex items-center justify-center text-white cursor-pointer"
          onClick={handleSearch}
        >
          <SearchIcon size="24" />
        </div> */}

        <div
          style={{ background: primaryColor }}
          className="w-[70px] h-full rounded-r-lg flex items-center justify-center text-white cursor-pointer"
          onClick={handleCleanSearch}
        >
          <TrashIcon size="24" />
        </div>
      </div>
    </section>
  );
};
