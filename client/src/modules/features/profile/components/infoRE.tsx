import { MapLocations } from "@/core/components/map/mapLocations";
import { Language, Translations } from "@/core/store/language";
import useRealEstateStore from "@/core/store/realEstate";
import { handlePost } from "@/core/utils/fetch";
import { NearbyPlace } from "@/features/home/components/sectionRealEstates";
import { RealEstate } from "@/shared/types/realEstate";
import { useEffect, useState } from "react";

type ParamsType = {
  selectedRE: RealEstate | null;
  language: Language;
  texts: Translations;
};
export const InfoRE = ({ selectedRE, language, texts }: ParamsType) => {
  const [places, setPlaces] = useState<NearbyPlace[]>([] as NearbyPlace[]);
  const { setPlaces: setPlacesStorage, placesSelected } = useRealEstateStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLocations = async () => {
      // Only fetch if not already fetched
      const res = await handlePost<NearbyPlace[]>(
        "real_estates/fetch_nearby_places",
        {
          location: selectedRE?.lat_long,
        }
      );
      setLoading(false)
      setPlacesStorage(res.val);
      setPlaces(res.val);
    };
    if (places.length == 0) handleLocations();
  }, []);

  return (
    <div className="h-[250px] overflow-y-auto -m-5 py-2 px-5 flex flex-col gap-2">
      <p className="text-justify text-base font-bold text-gray-900">
        {selectedRE?.title[language]}
      </p>

      <p className="text-[15px] text-gray-600 ">
        {selectedRE?.description[language]}
      </p>

      <div>
        <p>
          <span className="text-[14px] text-gray-600 font-semibold">
            {texts.addresVisitUser}:{" "}
          </span>
          <span className="text-[14px] text-gray-600">
            {selectedRE?.address}
          </span>
        </p>
        <div className="flex gap-2 justify-evenly">
          <p>
            <span className="text-[13px] text-gray-600 font-semibold">
              {texts.amountBathroomsVisitUser}:{" "}
            </span>
            <span className="text-[13px] text-gray-600">
              {" "}
              {selectedRE?.amount_bathroom}
            </span>
          </p>
          <p>
            <span className="text-[13px] text-gray-600 font-semibold">
              {texts.amountBedroomsVisitUser}:{" "}
            </span>
            <span className="text-[13px] text-gray-600">
              {selectedRE?.amount_bedroom}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <MapLocations
          locations={placesSelected}
          location={selectedRE?.lat_long ?? ""}
          setLocation={() => {}}
          width={390}
          isLoading={loading}

        />
      </div>
    </div>
  );
};
