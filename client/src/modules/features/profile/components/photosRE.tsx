import Ball from "@/core/components/form/ball";
import { RealEstate } from "@/shared/types/realEstate";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import PhotoNOAvailable from "@/shared/assets/photo-no-available.jpg";
import { primaryColor } from "@/core/constants/colors";
import { Options } from "./publicationsAndFavorites";

type ParamsType = {
    selectedRE: RealEstate | null;
    currentOption: Options
    setCurrentOption: (option: Options) => void;
};
export const PhotosRE = ({selectedRE, currentOption, setCurrentOption}: ParamsType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [currentImageVisible, setCurrentImageVisible] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentImageVisible(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Attach the onSelect callback to the embla instance
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Initialize the current index
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
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
              selectedRE?.photos != undefined && selectedRE?.photos?.length > 0
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
    </>
  );
};
