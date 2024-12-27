import Btn from "@/core/components/form/button";
import { Buttons } from "./buttons";
import { Info } from "./info";
import { Photo } from "./photo";
import { locationType, NearbyPlace, State } from "../sectionRealEstates";
import useNavigation from "@/core/hooks/useNavigate";
import { useLanguageStore } from "@/core/store/language";
import { RealEstate } from "@/shared/types/realEstate";
import { ExtraInfo } from "./extraInfo";
import useUserStore from "@/core/store/user";
import { useEffect, useState } from "react";
import { handlePost } from "@/core/utils/fetch";

type ParamsType = {
  index: number;
  item: RealEstate;
  firstElementRef: React.RefObject<HTMLDivElement>;
  infoTextLanguage: string;
  placeTextLanguage: string;
  seeMoreBtn: string;
  isFavorite: boolean;
};
export const RealEstateComp = ({
  index,
  item,
  firstElementRef,
  infoTextLanguage,
  placeTextLanguage,
  seeMoreBtn,
  isFavorite,
}: ParamsType) => {
  const { handleNavigate } = useNavigation();
  const { language, texts } = useLanguageStore();
  const { selectUser } = useUserStore();

  const [states, setStates] = useState<State>("info");

  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [placesAux, setPlacesAux] = useState<NearbyPlace[]>([]);
  const [locationsType, setLocationsType] = useState<locationType[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isloadingLocations, setIsloadingLocations] = useState(true);

  const getCurrentLocationType = (option: locationType) => {
    if (option.key === "all") {
      setPlaces(placesAux);
      return;
    }
    const res = placesAux.filter((place) => place.types.includes(option.key));
    setPlaces(res);
  };

  const handleStateChange = async (
    index: number,
    newState: State,
    item: RealEstate
  ) => {
    setStates(newState);

    if (newState === "places" && !places[index]) {
      // Only fetch if not already fetched
      const res = await handlePost<NearbyPlace[]>(
        "real_estates/fetch_nearby_places",
        {
          location: item.lat_long,
        }
      );

      setIsLoading(false);
      setPlaces(res.val);
      setPlacesAux(res.val);
      const res2 = await handlePost<locationType[]>(
        "real_estates/fetch_all_types_places",
        {
          location: item.lat_long,
        }
      );
      setLocationsType(res2.val);
      setIsloadingLocations(false);
    }
  };

  return (
    <div
      key={index}
      ref={index === 0 ? firstElementRef : null}
      className={`flex w-[90%] flex-col md:flex-row gap-8 items-center ${
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Pass isFavorite as a prop to the Photo component */}
      <Photo
        img={item.photos}
        index={index}
        isFavorite={isFavorite}
        item={item}
      />

      <div
        className={`flex flex-col gap-1 items-center ${
          index % 2 === 1 ? "md:items-end" : "md:items-start"
        } text-center w-full md:w-1/2`}
      >
        <Buttons
          handleStateChange={handleStateChange}
          states={states}
          index={index}
          item={item}
          info={infoTextLanguage}
          places={placeTextLanguage}
          texts={texts}
          locationsType={locationsType}
          getCurrentLocationType={getCurrentLocationType}
          isloadingLocations={isloadingLocations}
        />

        <Info index={index} item={item} language={language} states={states} />
        {states === "info" && (
          <div className="w-[170px]">
            <Btn
              text={seeMoreBtn}
              className="w-[150px]"
              isPending={false}
              onClick={() => {
                selectUser(item.user);
                handleNavigate("/visit_user");
              }}
            />
          </div>
        )}

        <ExtraInfo
          item={item}
          states={states}
          places={places}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
