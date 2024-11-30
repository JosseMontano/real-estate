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
import { deleteFavRe, fetchGetFavsRE } from "../api/endpoints";
import useAuthStore from "@/core/store/auth";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../App";
import { ListComments } from "./listComments";
import { Empty } from "@/core/components/map/empty";
import { User } from "@/core/types/user";

type ParamsType = {
  isModalOpen: boolean;
  handleShowModal: () => void;
  realEstate: RealEstate[];
  selectedRE: RealEstate | null;
  setSelectedRE: (re: RealEstate) => void;
  stateBtn: options;
  user:User
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
  user
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

  const { data: realEstateFavs } = useGet({
    services: () => fetchGetFavsRE(user?.id || 0),
    queryKey: ["favs-real-estates", user?.id],
    itemsPerPage: 10,
    valueToService: user?.id,
  });

  const { mutate: deleteFav } = useMutation({
    mutationFn: deleteFavRe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favs-real-estates", user?.id],
      });
    },
  });

  return (
    <div className="max-h-[240px] overflow-y-auto ">
      <div className="w-full mt-5">
        <div className="flex flex-wrap gap-4 w-full max-w-none items-center ">
          {stateBtn == "Publications" && (
            <>
              {realEstate.map((publication) => (
                <RealEstateComp
                  publication={publication}
                  handleShowModal={handleShowModal}
                  setSelectedRE={setSelectedRE}
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
                  deleteFav={deleteFav}
                  favREiD={publication.id}
                />
              ))}
              {realEstateFavs.length == 0} && (
              <div className="w-full">
                <Empty data={realEstateFavs} />
              </div>
              )
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
            />

            {currentOption === Options.General && (
              <InfoRE selectedRE={selectedRE} language={language} />
            )}

            {currentOption === Options.Questions && (
              <Questions selectedRE={selectedRE} />
            )}

            {currentOption === Options.Feedback && (
              <ListComments user={user} selectedRE={selectedRE} />
            )}
          </div>
        }
      />
    </div>
  );
};
