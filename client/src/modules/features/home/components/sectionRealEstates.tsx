import { primaryColor } from "@/core/constants/colors";
import Pagination from "@/core/components/form/pagination";
import { useLanguageStore } from "@/core/store/language";
import { RealEstate } from "@/shared/types/realEstate";
import { useEffect, useState } from "react";
import { handlePost } from "@/core/utils/fetch";
import { Photo } from "./realEstates/photo";
import { Buttons } from "./realEstates/buttons";
import { Info } from "./realEstates/info";
import { ExtraInfo } from "./realEstates/extraInfo";
import Btn from "@/core/components/form/button";
import useNavigation from "@/core/hooks/useNavigate";
import useUserStore from "@/core/store/user";
import { currentREType } from "../types/types";
import { User } from "@/core/types/user";
import { LanguageDB } from "@/shared/types/language";

type Params = {
  realEstates: RealEstate[];
  firstElementRef: React.RefObject<HTMLDivElement>;
  amountOfPages: number;
  handlePagination: (page: number) => void;
  currentPage: number;
  infoTextLanguage: string;
  placeTextLanguage: string;
  seeMoreBtn: string;
  currentRE: currentREType;
  user: User;
};

export interface NearbyPlace {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  types: string[];
}
export interface locationType {
  key: string;
  value: LanguageDB;
}

export const SectionRealStates = ({
  realEstates,
  firstElementRef,
  amountOfPages,
  handlePagination,
  currentPage,
  infoTextLanguage,
  placeTextLanguage,
  seeMoreBtn,
  currentRE,
  user,
}: Params) => {
  const { language, texts } = useLanguageStore();
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [placesAux, setPlacesAux] = useState<NearbyPlace[]>([]);
  const [locationsType, setLocationsType] = useState<locationType[]>([]);
  const { selectUser } = useUserStore();
  const [states, setStates] = useState<State[]>(
    Array(realEstates.length).fill("info")
  );
  type State = "info" | "places";
  const { handleNavigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isloadingLocations, setIsloadingLocations] = useState(true);
  const handleStateChange = async (
    index: number,
    newState: State,
    item: RealEstate
  ) => {
    const newStates = [...states];
    newStates[index] = newState;
    setStates(newStates);

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
      setIsloadingLocations(false)
    }
  };

  useEffect(() => {
    setStates(Array(realEstates.length).fill("info"));
  }, [realEstates]);

  const getCurrentLocationType = (option: locationType) => {
    if (option.key === "all") {
      setPlaces(placesAux);
      return;
    }
    const res = placesAux.filter((place) => place.types.includes(option.key));
    setPlaces(res);
  };

  return (
    <div
      className="space-y-12 py-10 flex flex-col items-center"
      id="realEstates"
    >
      {realEstates.map((item, index) => {
        const isFavorite = user?.favorites?.some(
          (favorite) => favorite.real_estate.id === item.id
        );

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

              <Info
                index={index}
                item={item}
                language={language}
                states={states}
              />
              {states[index] === "info" && (
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
                index={index}
                item={item}
                states={states}
                places={places}
                isLoading={isLoading}
              />
            </div>
          </div>
        );
      })}
      {currentRE == "real-estates" && (
        <Pagination
          currentPage={currentPage}
          primaryColor={primaryColor}
          handlePagination={handlePagination}
          lastPage={amountOfPages}
        />
      )}
    </div>
  );
};
