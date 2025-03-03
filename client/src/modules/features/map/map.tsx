import { MapLocations } from "@/core/components/map/mapLocations";
import { handlePost } from "@/core/utils/fetch";
import { useEffect, useState } from "react";
import {
  locationType,
  NearbyPlace,
} from "../home/components/sectionRealEstates";
import { useParams } from "react-router-dom";
import { Language, useLanguageStore } from "@/core/store/language";

type ParamsType = {
  lat_long: string;
  languageParams: string;
};
export const MapPage = ({}: ParamsType) => {
  const { texts } = useLanguageStore();
  const allSelect = { en: "All", es: "Todos", pt: "Todos" };
  const [locationsType, setLocationsType] = useState<locationType[]>([]);
  const { lat_long, languageParams } = useParams<ParamsType>();
  const [optionInMobile, setOptionInMobile] = useState("all");
  //@ts-ignore
  const [language, setLanguage] = useState<Language | null>(null);
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [placesAux, setPlacesAux] = useState<NearbyPlace[]>([]);

  const [isloadingLocations, setIsloadingLocations] = useState(true);

  const getCurrentLocationType = (option: locationType) => {
    if (option.key === "all") {
      setPlaces(placesAux);
      return;
    }
    const res = placesAux.filter((place) => place.types.includes(option.key));
    setPlaces(res);
  };

  const handleStateChange = async () => {
    const res = await handlePost<NearbyPlace[]>(
      "real_estates/fetch_nearby_places",
      {
        location: lat_long,
      }
    );

    const res2 = await handlePost<locationType[]>(
      "real_estates/fetch_all_types_places",
      {
        location: lat_long ?? "",
      }
    );
    setLocationsType(res2.val);
    setPlacesAux(res.val);
    setPlaces(res.val);

    setIsloadingLocations(false);
  };

  useEffect(() => {
    handleStateChange();
  }, []);
  useEffect(() => {
    //@ts-ignore
    if (languageParams) setLanguage(languageParams);
  }, [languageParams]);

   useEffect(() => {
    getCurrentLocationType({ key: optionInMobile, value: allSelect });
   }, [optionInMobile]);

  if (language === null) return null;
  return (
    <div className="flex flex-col gap-2">
    <div className="">
      {optionInMobile}
    <select className="w-[170px] text-sm px-2 py-[4px] border rounded-lg focus:outline-none"    onChange={(e) => {
            const selectedValue = e.target.value;
            const message = {
              type: "FILTER_CHANGE",
              filterKey: selectedValue,
            };
            setOptionInMobile(selectedValue);
            //@ts-ignore
            window.ReactNativeWebView.postMessage(JSON.stringify(message));
          }}>
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
    </div>

      <MapLocations
        location={lat_long ?? ""}
        locations={places}
        setLocation={() => {}}
        isLoading={isloadingLocations}
      />
    </div>
  );
};
