import { primaryColor } from "@/const/colors";
import Pagination from "@/core/components/form/pagination";
import { useLanguageStore } from "@/core/store/language";
import img1 from "@/shared/assets/BR.jpg";
import { RealEstate } from "@/shared/types/realEstate";
import { useEffect, useState } from "react";
import { handlePost } from "@/core/utils/fetch";
import { Photo } from "./realEstates/photo";
import { Buttons } from "./realEstates/buttons";
import { Info } from "./realEstates/info";
import { ExtraInfo } from "./realEstates/extraInfo";

type Params = {
  realEstates: RealEstate[];
  firstElementRef: React.RefObject<HTMLDivElement>;
  amountOfPages: number;
  handlePagination: (page: number) => void;
  currentPage: number;
};

export interface NearbyPlace {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  types: string[];
}
export type State = "info" | "places";

export const SectionRealStates = ({
  realEstates,
  firstElementRef,
  amountOfPages,
  handlePagination,
  currentPage,
}: Params) => {
  const { language } = useLanguageStore();
  const [places, setPlaces] = useState<{ [key: number]: NearbyPlace[] }>({});
  const [states, setStates] = useState<State[]>(
    Array(realEstates.length).fill("info")
  );

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
      const res = await handlePost("fetch_nearby_places", {
        location: item.latLong,
      });
      setPlaces((prevPlaces) => ({
        ...prevPlaces,
        [index]: res.val,
      }));
    }
  };

  useEffect(() => {
    setStates(Array(realEstates.length).fill("info"));
  }, [realEstates]);

  return (
    <div className="space-y-12 py-10">
      {realEstates.map((item, index) => (
        <div
          key={index}
          ref={index === 0 ? firstElementRef : null}
          className={`flex flex-col md:flex-row gap-8 items-center ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <Photo img={img1} />
          <div
            className={`flex flex-col ${
              index % 2 === 1 ? "items-end" : "items-start"
            } text-center w-full md:w-1/2`}
          >
            <Buttons
              handleStateChange={handleStateChange}
              states={states}
              index={index}
              item={item}
            />

            <Info
              index={index}
              item={item}
              language={language}
              states={states}
            />

            <ExtraInfo
              index={index}
              item={item}
              states={states}
              places={places}
            />
          </div>
        </div>
      ))}
      <Pagination
        amountOfPages={amountOfPages}
        currentPage={currentPage}
        primaryColor={primaryColor}
        handlePagination={handlePagination}
        lastPage={amountOfPages}
      />
    </div>
  );
};
