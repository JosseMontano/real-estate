import { primaryColor } from "@/core/constants/colors";
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
  return (
    <SearchFormComponent
      fields={fields}
      primaryColor={primaryColor}
      handleSelectChange={handleSelectChange}
      handleSearch={handleSearch}
    />
  );
};
