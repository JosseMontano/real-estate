import { Translations, useLanguageStore } from "@/core/store/language";
import RobotoIcon from "@/shared/assets/icons/robot";
import { RealEstate } from "@/shared/types/realEstate";
import { locationType } from "../sectionRealEstates";

export type StateBtnType = "info" | "places";

type ParamsType = {
  handleStateChange: (
    index: number,
    newState: any,
    item: RealEstate
  ) => Promise<void>;
  states: StateBtnType[];
  index: number;
  item: RealEstate;
  info: string;
  places: string;
  texts: Translations;
  locationsType: locationType[];
  getCurrentLocationType: (option: locationType) => void;
  isloadingLocations: boolean;
};
export const Buttons = ({
  handleStateChange,
  states,
  index,
  item,
  info,
  places,
  texts,
  locationsType,
  getCurrentLocationType,
  isloadingLocations,
}: ParamsType) => {
  const { language } = useLanguageStore();
  const allSelect = { en: "All", es: "Todos", pt: "Todos" };
  return (
    <div className="flex items-center gap-2">
      <div className="flex space-x-4 bg-gray-100 p-2 rounded-full">
        <button
          onClick={() => handleStateChange(index, "info", item)}
          className={`px-4 py-2 text-xs font-semibold ${
            states[index] === "info"
              ? "text-secondary bg-white"
              : "text-gray-500 hover:bg-white"
          } rounded-full shadow-sm`}
        >
          {info}
        </button>
        <button
          onClick={() => handleStateChange(index, "places", item)}
          className={`px-4 py-2 text-sm font-medium ${
            states[index] === "places"
              ? "text-secondary bg-white"
              : "text-gray-500 hover:bg-white"
          } rounded-full shadow-sm`}
        >
          {places}
        </button>
      </div>
      {item.similarity_score && item.similarity_score > 0 ? (
        <>
          {states[index] === "info" && (
            <div className="relative group flex gap-[5px]">
              <p>{item.similarity_score}</p>
              <RobotoIcon />
              <div className="absolute w-[200px] left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
                {`${texts.thereAre} ${item.similarity_score} ${texts.similaritiesHome}`}
              </div>
            </div>
          )}
          {states[index] === "places" && (
            <select className="w-[170px] text-sm px-2 py-[4px] border rounded-lg focus:outline-none">
              <option
                value={"all"}
                key={"all"}
                onClick={() =>
                  getCurrentLocationType({ key: "all", value: allSelect })
                }
              >
                {allSelect[language]}
              </option>
              {isloadingLocations && <option>{texts.loading}</option>}
              {locationsType.map((option) => (
                <option
                  value={option.key}
                  key={option.key}
                  onClick={() => getCurrentLocationType(option)}
                >
                  {option.value[language]}
                </option>
              ))}
            </select>
          )}
        </>
      ) : null}
    </div>
  );
};
