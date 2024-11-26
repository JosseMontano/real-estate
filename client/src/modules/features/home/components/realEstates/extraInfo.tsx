import { RealEstate } from "@/shared/types/realEstate";
import { NearbyPlace } from "../sectionRealEstates";
import { MapLocations } from "@/core/components/map/mapLocations";
import { StateBtnType } from "./buttons";

type ParamsType = {
  index: number;
  item: RealEstate;
  states: StateBtnType[];
  places: { [key: number]: NearbyPlace[] };
};
export const ExtraInfo = ({ index, item, states, places }: ParamsType) => {
  return (
    <>
      {states[index] === "places" && (
        <MapLocations
          locations={places[index] || []}
          location={item.lat_long}
          setLocation={() => {}}
        />
      )}
    </>
  );
};
