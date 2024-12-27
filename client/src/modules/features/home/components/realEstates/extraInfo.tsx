import { RealEstate } from "@/shared/types/realEstate";
import { NearbyPlace } from "../sectionRealEstates";
import { MapLocations } from "@/core/components/map/mapLocations";
import { StateBtnType } from "./buttons";

type ParamsType = {
  item: RealEstate;
  states: StateBtnType;
  places: NearbyPlace[] ;
  isLoading: boolean;
};
export const ExtraInfo = ({
  item,
  states,
  places,
  isLoading,
}: ParamsType) => {
  return (
    <>
      {states === "places" && (
        <>
          <MapLocations
            locations={places}
            location={item.lat_long}
            setLocation={() => {}}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};
