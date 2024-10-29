import { RealEstate } from "@/shared/types/realEstate";
import { NearbyPlace, State } from "../sectionRealEstates";
import { MapLocations } from "@/core/components/map/mapLocations";

type ParamsType = {
    index: number;
    item: RealEstate;
    states: State[];
    places: { [key: number]: NearbyPlace[] };
}
export const ExtraInfo = ({
    index,
    item,
    states,
    places,

}:ParamsType) => {
    return (
        <>
        
        {states[index] === "places" && (
              <MapLocations
                locations={places[index] || []}
                location={item.latLong}
                setLocation={() => {}}
              />
            )}
        </>
    );
}