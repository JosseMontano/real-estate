import { primaryColor } from "@/const/colors";
import Pagination from "@/core/components/form/pagination";
import { useLanguageStore } from "@/core/store/language";
import img1 from "@/shared/assets/BR.jpg";
import { RealEstate } from "@/shared/types/realEstate";
import { useState } from "react";
import { handlePost } from "@/core/utils/fetch";

type Params = {
  realEstates: RealEstate[];
  firstElementRef: React.RefObject<HTMLDivElement>;
  amountOfPages: number;
  handlePagination: (page: number) => void;
  currentPage: number;
};

export const SectionRealStates = ({
  realEstates,
  firstElementRef,
  amountOfPages,
  handlePagination,
  currentPage,
}: Params) => {
  const { language } = useLanguageStore();
  type State = "info" | "places";

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
    const res =await handlePost("fetch_nearby_places", {location:item.latLong});
    console.log(res);
  }
  ;
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
          <div className="flex justify-center w-full md:w-1/2">
            <img
              src={img1}
              alt="Imagen"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
            />
          </div>
          <div
            className={`flex flex-col ${
              index % 2 === 1 ? "items-end" : "items-start"
            } text-center w-full md:w-1/2`}
          >
            <div className="flex space-x-4 bg-gray-100 p-2 rounded-full">
              <button
                onClick={() => handleStateChange(index, "info", item)}
                className={`px-4 py-2 text-sm font-medium ${
                  states[index] === "info"
                    ? "text-purple-700 bg-white"
                    : "text-gray-500 hover:bg-white"
                } rounded-full shadow-sm`}
              >
                Informacion
              </button>
              <button
                onClick={() => handleStateChange(index, "places", item)}
                className={`px-4 py-2 text-sm font-medium ${
                  states[index] === "places"
                    ? "text-purple-700 bg-white"
                    : "text-gray-500 hover:bg-white"
                } rounded-full shadow-sm`}
              >
                Lugares
              </button>
            </div>
            {states[index] === "info" && (
              <>
                <h1 className="mt-6 text-start text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-xs md:max-w-md lg:max-w-lg">
                  {item.description[language]}
                </h1>
                <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                  {item.title[language]}
                </p>
                <button className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-purple-700">
                  Ver más
                </button>
              </>
            )}
            {states[index] === "places" && (
              <>
                <p>{item.latLong}</p>
                <p>hola</p>
              </>
            )}
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
