import { RealEstate } from "@/shared/types/realEstate";
import { State } from "../sectionRealEstates";

type ParamsType = {
  handleStateChange: (
    index: number,
    newState: State,
    item: RealEstate
  ) => Promise<void>;
  states: State[];
  index: number;
  item: RealEstate;
};
export const Buttons = ({
  handleStateChange,
  states,
  index,
  item,
}: ParamsType) => {
  return (
    <div className="flex space-x-4 bg-gray-100 p-2 rounded-full">
      <button
        onClick={() => handleStateChange(index, "info", item)}
        className={`px-4 py-2 text-xs font-medium ${
          states[index] === "info"
            ? "text-purple-700 bg-white"
            : "text-gray-500 hover:bg-white"
        } rounded-full shadow-sm`}
      >
        Informacion
      </button>
      <button
        onClick={() => handleStateChange(index, "places", item)}
        className={`px-4 py-2 text-sm font-medium ${
          states[index] === "places"
            ? "text-purple-700 bg-white"
            : "text-gray-500 hover:bg-white"
        } rounded-full shadow-sm`}
      >
        Lugares
      </button>
    </div>
  );
};
