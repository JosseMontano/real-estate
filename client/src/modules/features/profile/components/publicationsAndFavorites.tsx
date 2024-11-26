import { ShowModal } from "@/core/components/form/modal";
import { RealEstate } from "@/shared/types/realEstate";
import { useLanguageStore } from "@/core/store/language";
import PhotoNOAvailable from "@/shared/assets//photo-no-available.jpg";
import { useCallback, useEffect, useState } from "react";
import { primaryColor } from "@/core/constants/colors";
import { LanguageDB } from "@/shared/types/language";
import Ball from "@/core/components/form/ball";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { UserIcon } from "@/shared/assets/icons/user";
import { fetchUnasweredQuestions } from "../api/endpoints";
import { FormResponse } from "./formResponse";
import useGet from "@/core/hooks/useGet";
import { HeadingIcon } from "@/shared/assets/icons/heading";

type ParamsType = {
  isModalOpen: boolean;
  handleShowModal: () => void;
  realEstate: RealEstate[];
  selectedRE: RealEstate | null;
  setSelectedRE: (re: RealEstate) => void;
};

enum Options {
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [currentImageVisible, setCurrentImageVisible] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentImageVisible(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const { data: unasweredQuestions } = useGet({
    queryKey: ["realEstate-by-user", selectedRE?.id],
    services: () => fetchUnasweredQuestions(selectedRE?.id ?? 0),
    valueToService: selectedRE?.id,
  });

  // Attach the onSelect callback to the embla instance
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Initialize the current index
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="w-full my-1">
        <div className="flex flex-wrap gap-4 w-full max-w-none items-center overflow-y-auto max-h-[670px]">
          {realEstate.map((publication) => (
            <div
              key={publication.id}
              className="flex flex-col justify-center items-center gap-1"
            >
              <img
                src={
                  publication.photos.length > 0
                    ? publication.photos[0].image
                    : PhotoNOAvailable
                }
                alt="Imagen"
                className="w-[260px] h-[220px] rounded-lg shadow-lg object-cover cursor-pointer"
                onClick={() => {
                  setSelectedRE(publication);
                  handleShowModal();
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <ShowModal
        isModalOpen={isModalOpen}
        setIsModalOpen={handleShowModal}
        title={options[currentOption - 1][language]}
        children={
          <div className="max-w-md flex flex-col gap-5  w-[370px]">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                {selectedRE?.photos.map((v) => (
                  <div key={v.id} className="embla__slide flex justify-center">
                    <img
                      src={v.image}
                      alt="Imagen"
                      className="w-[650px] h-[250px] object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-2 w-full">
                      <div className="flex justify-center gap-1">
                        {selectedRE?.photos.map((_, key) => (
                          <Ball
                            currentVisible={currentImageVisible}
                            value={key}
                            key={key}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedRE?.photos.length == 0 && (
              <div className="flex flex-col justify-center w-full relative">
                <img
                  src={
                    selectedRE?.photos != undefined &&
                    selectedRE?.photos?.length > 0
                      ? selectedRE?.photos[0].image
                      : PhotoNOAvailable
                  }
                  alt="Imagen"
                  className="w-full h-52 object-cover rounded-lg shadow-lg "
                />
              </div>
            )}

            <div
              className={`flex flex-col items-center text-center w-full border-b-2 pb-2 border-gray-300`}
            >
              <div className="flex items-center gap-2 bg-gray-100 px-2 rounded-lg h-8">
                <span
                  onClick={() => setCurrentOption(1)}
                  className="cursor-pointer border-b-2 border-gray-100"
                  style={{
                    borderColor: currentOption === 1 ? primaryColor : "",
                  }}
                >
                  General
                </span>
                <span
                  onClick={() => setCurrentOption(2)}
                  className={`px-2 h-full flex items-center cursor-pointer 
              border-x-2 border-gray-200 border-b-2
              ${
                currentOption === 2
                  ? ` border-b-primary`
                  : "border-b-transparent"
              }`}
                >
                  Preguntas
                </span>
                <span
                  onClick={() => setCurrentOption(3)}
                  className="cursor-pointer border-b-2 border-gray-100"
                  style={{
                    borderColor: currentOption === 3 ? primaryColor : "",
                  }}
                >
                  Reseñas
                </span>
              </div>
            </div>

            {currentOption === Options.General && (
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
                      Direccion:{" "}
                    </span>
                    <span className="text-[14px] text-gray-600">
                      {selectedRE?.address}
                    </span>
                  </p>
                  <div className="flex gap-2 justify-evenly">
                    <p>
                      <span className="text-[13px] text-gray-600 font-semibold">
                        Cantidad de baños:{" "}
                      </span>
                      <span className="text-[13px] text-gray-600">
                        {" "}
                        {selectedRE?.amount_bathroom}
                      </span>
                    </p>
                    <p>
                      <span className="text-[13px] text-gray-600 font-semibold">
                        Cantidad de Cuartos:{" "}
                      </span>
                      <span className="text-[13px] text-gray-600">
                        {selectedRE?.amount_bedroom}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentOption === Options.Questions && (
              <div className="h-[250px] -m-5 py-2 px-5 overflow-y-auto flex flex-wrap gap-[7px]">
                {unasweredQuestions?.map((question) => (
                  <div
                    className={`w-[49%] rounded-md h-[180px] shadow-2xl p-3 border-t-4 border-t-primary flex flex-col gap-1`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-[550]">Pregunta 1</h4>
                      <HeadingIcon size={16} />
                    </div>

                    <p className="text-[13px]">Aceptan mascotas?</p>

                    <div className="flex gap-1 items-center  ">
                    <div className="bg-gray-200 p-[2px] rounded-full">
                      <UserIcon size="16" />
                      </div>
                   
                     <span className="text-[13px]">Anonimo</span>
                    </div>
                    <FormResponse
                      questionId={question.id}
                      realEstateId={selectedRE?.id ?? 0}
                    />
                  </div>
                ))}
              </div>
            )}

            {currentOption === Options.Feedback && (
              <div className="">
                <h1 className="text-justify font-bold text-gray-900 ">xd23</h1>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};
