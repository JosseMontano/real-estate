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
  info:string;
  places:string
};
export const Buttons = ({
  handleStateChange,
  states,
  index,
  item,
  info,
  places
}: ParamsType) => {
  return (
    <div className="flex space-x-4 bg-gray-100 p-2 rounded-full">
      <button
        onClick={() => handleStateChange(index, "info", item)}
        className={`px-4 py-2 text-xs font-semibold ${
          states[index] === "info"
            ? "secondary bg-white"
            : "text-gray-500 hover:bg-white"
        } rounded-full shadow-sm`}
      >
        {info}
      </button>
      <button
        onClick={() => handleStateChange(index, "places", item)}
        className={`px-4 py-2 text-sm font-medium ${
          states[index] === "places"
            ? "secondary bg-white"
            : "text-gray-500 hover:bg-white"
        } rounded-full shadow-sm`}
      >
        {places}
      </button>
    </div>
  );
};
