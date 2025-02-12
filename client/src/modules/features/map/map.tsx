import { MapLocations } from "@/core/components/map/mapLocations";
import { handlePost } from "@/core/utils/fetch";
import { useEffect, useState } from "react";
import {
  NearbyPlace,
} from "../home/components/sectionRealEstates";
import { useParams } from "react-router-dom";

type ParamsType = {
  lat_long: string;
};
export const MapPage = ({}: ParamsType) => {
  const { lat_long } = useParams<ParamsType>();
  const [places, setPlaces] = useState<NearbyPlace[]>([]);

  const [isloadingLocations, setIsloadingLocations] = useState(true);

  const handleStateChange = async () => {
    const res = await handlePost<NearbyPlace[]>(
      "real_estates/fetch_nearby_places",
      {
        location: lat_long,
      }
    );
    setPlaces(res.val);
    setIsloadingLocations(false);
  };

  useEffect(() => {
    handleStateChange();
  }, []);

  return (
    <div>
      <MapLocations
        location={lat_long ?? ""}
        locations={places}
        setLocation={() => {}}
        isLoading={isloadingLocations}
      />
    </div>
  );
};
