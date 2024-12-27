import { RealEstate } from "@/shared/types/realEstate";
import { locationType, NearbyPlace } from "../sectionRealEstates";
import { MapLocations } from "@/core/components/map/mapLocations";
import { StateBtnType } from "./buttons";
import CustomSelect from "@/core/components/form/select";
import { useLanguageStore } from "@/core/store/language";

type ParamsType = {
  index: number;
  item: RealEstate;
  states: StateBtnType[];
  places: { [key: number]: NearbyPlace[] };
  isLoading: boolean;
  locationsType: locationType[]
};
export const ExtraInfo = ({
  index,
  item,
  states,
  places,
  isLoading,
  locationsType
}: ParamsType) => {
    const { language } = useLanguageStore();
  return (
    <>
      {states[index] === "places" && (
        <>
         <select
                  className="w-[100%] text-sm px-2 py-[4px] border rounded-lg focus:outline-none"
           /*        value={selectedValues[index]?.id || ""}
                  onChange={(e) =>
                    handleSelectChange(
                      //@ts-ignore
                      options.find((opt) => opt.id === Number(e.target.value)),
                      index
                    )
                  } */
    /*               onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                  onBlur={(e) => (e.target.style.borderColor = "transparent")} */
                >
                  {locationsType.map((option) => (
                    <option value={option.key} key={option.key}>
                      {option.value[language]}
                    </option>
                  ))}
                </select>
          <MapLocations
            locations={places[index] || []}
            location={item.lat_long}
            setLocation={() => {}}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};
