import { primaryColor } from "@/core/constants/colors";
import Pagination from "@/core/components/form/pagination";
import { RealEstate } from "@/shared/types/realEstate";
import { currentREType } from "../types/types";
import { User } from "@/core/types/user";
import { LanguageDB } from "@/shared/types/language";
import { RealEstateComp } from "./realEstates/realEstate";

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
export type State = "info" | "places";
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
  return (
    <div
      className="space-y-12 py-10 flex flex-col items-center"
      id="realEstates"
    >
      {realEstates.map((item) => {
        const isFavorite = user?.favorites?.some(
          (favorite) => favorite.real_estate.id === item.id
        );

        return (
          <RealEstateComp
            index={item.id ?? 0}
            item={item}
            firstElementRef={firstElementRef}
            infoTextLanguage={infoTextLanguage}
            placeTextLanguage={placeTextLanguage}
            seeMoreBtn={seeMoreBtn}
            isFavorite={isFavorite}
          />
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
