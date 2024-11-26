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
import useGet from "@/core/hooks/useGet";
import { fetchGetFavsRE } from "../api/endpoints";
import useAuthStore from "@/core/store/auth";

type ParamsType = {
  isModalOpen: boolean;
  handleShowModal: () => void;
  realEstate: RealEstate[];
  selectedRE: RealEstate | null;
  setSelectedRE: (re: RealEstate) => void;
  stateBtn: options;
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
}: ParamsType) => {
  const [currentOption, setCurrentOption] = useState<Options>(1);
  const { language } = useLanguageStore();

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
  const { user } = useAuthStore();
  const { isLoading, data: realEstateFavs } = useGet({
    services: () => fetchGetFavsRE(user?.id || 0),
    queryKey: ["favs-real-estates", user?.id],
    itemsPerPage: 10,
    valueToService: user?.id,
  });

  console.log(realEstateFavs);

  return (
    <div>
      <div className="w-full my-1">
        <div className="flex flex-wrap gap-4 w-full max-w-none items-center overflow-y-auto max-h-[670px]">
          {stateBtn == "Publications" &&
            realEstate.map((publication) => (
              <RealEstateComp
                publication={publication}
                handleShowModal={handleShowModal}
                setSelectedRE={setSelectedRE}
              />
            ))}
            {
              stateBtn == "Favorites" &&
              realEstateFavs?.map((publication) => (
                <RealEstateComp
                  publication={publication.real_estate}
                  handleShowModal={handleShowModal}
                  setSelectedRE={setSelectedRE}
                />
              ))
            }
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
            />

            {currentOption === Options.General && (
              <InfoRE selectedRE={selectedRE} language={language} />
            )}

            {currentOption === Options.Questions && (
              <Questions selectedRE={selectedRE} />
            )}

            {currentOption === Options.Feedback && (
              <div className="h-[250px] -m-5 py-2 px-5 overflow-y-auto">
                <h1 className="text-justify font-bold text-gray-900 ">xd23</h1>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};
