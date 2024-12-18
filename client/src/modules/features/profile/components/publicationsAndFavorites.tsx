import { ShowModal } from "@/core/components/form/modal";
import { RealEstate } from "@/shared/types/realEstate";
import { useLanguageStore } from "@/core/store/language";
import { useState } from "react";
import { LanguageDB } from "@/shared/types/language";
import { RealEstateComp } from "./realEstate";
import { PhotosRE } from "./photosRE";
import { InfoRE } from "./infoRE";
import { Questions } from "./questions";
import { options } from "../profile";
import { deleteFavRe } from "../api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../App";
import { ListComments } from "./listComments";
import { Empty } from "@/core/components/map/empty";
import { User } from "@/core/types/user";
import { FavRealEstate } from "../interface/favRE";
import useAuthStore from "@/core/store/auth";

type ParamsType = {
  isModalOpen: boolean;
  handleShowModal: () => void;
  realEstate: RealEstate[];
  realEstateFavs: FavRealEstate[];
  selectedRE: RealEstate | null;
  setSelectedRE: (re: RealEstate) => void;
  stateBtn: options;
  user: User;
  refetchCommentTop: () => void;
};

export enum Options {
  General = 1,
  Questions = 2,
  Feedback = 3,
}

export const PublicationsAndFavorites = ({
  handleShowModal,
  isModalOpen,
  realEstate,
  selectedRE,
  setSelectedRE,
  stateBtn,
  user,
  realEstateFavs,
  refetchCommentTop,
}: ParamsType) => {
  const [currentOption, setCurrentOption] = useState<Options>(1);
  const { language, texts } = useLanguageStore();
  const { user: userLogged, removeFavorite } = useAuthStore();
  const options: LanguageDB[] = [
    {
      es: "General",
      en: "General",
      pt: "General",
    },
    {
      es: "Preguntas",
      en: "Questions",
      pt: "Perguntas",
    },
    {
      es: "Reseñas",
      en: "Feedback",
      pt: "Feedback",
    },
  ];


  return (
    <div className="max-h-[240px] overflow-y-auto ">
      <div className="w-full mt-5">
        <div className="flex flex-wrap gap-4 w-full max-w-none items-center">
          {stateBtn == "Publications" && (
            <>
              {realEstate.map((publication) => (
                <RealEstateComp
                  publication={publication}
                  handleShowModal={handleShowModal}
                  setSelectedRE={setSelectedRE}
                  userLogged={userLogged}
                  removeFavorite={removeFavorite}
                />
              ))}
              {realEstate.length == 0 && (
                <div className="w-full">
                  <Empty data={realEstate} />
                </div>
              )}
            </>
          )}
          {stateBtn == "Favorites" && (
            <>
              {realEstateFavs?.map((publication) => (
                <RealEstateComp
                  publication={publication.real_estate}
                  handleShowModal={handleShowModal}
                  setSelectedRE={setSelectedRE}
                  showIcon={true}
                  userLogged={userLogged}
                  removeFavorite={removeFavorite}
                />
              ))}
              {realEstateFavs.length == 0 && (
                <div className="w-full ">
                  <Empty data={realEstateFavs} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ShowModal
        isModalOpen={isModalOpen}
        setIsModalOpen={handleShowModal}
        title={options[currentOption - 1][language]}
        children={
          <div className="max-w-md flex flex-col gap-5  w-[370px]">
            <PhotosRE
              selectedRE={selectedRE}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              texts={texts}
            />

            {currentOption === Options.General && (
              <InfoRE
                selectedRE={selectedRE}
                language={language}
                texts={texts}
              />
            )}

            {currentOption === Options.Questions && (
              <Questions
                selectedRE={selectedRE}
                texts={texts}
                language={language}
                user={user}
                userLogged={userLogged}
              />
            )}

            {currentOption === Options.Feedback && (
              <ListComments
                user={userLogged}
                selectedRE={selectedRE}
                language={language}
                texts={texts}
                refetchCommentTop={refetchCommentTop}
              />
            )}
          </div>
        }
      />
    </div>
  );
};
