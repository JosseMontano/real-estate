import { RealEstate } from "@/shared/types/realEstate";
import { State } from "../sectionRealEstates";
import { Language } from "@/core/store/language";

type ParamsType = {
  index: number;
  item: RealEstate;
  states: State[];
  language: Language;
  handleStateModal: (v:RealEstate) => void
};
export const Info = ({ index, item, language, states, handleStateModal }: ParamsType) => {
  return (
    <>
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
          <button onClick={()=>handleStateModal(item)}>Agregar comentario</button>
        </>
      )}
    </>
  );
};
