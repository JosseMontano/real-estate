import img1 from "@/shared/assets/BR.jpg";

import { RealEstate } from "@/shared/types/realEstate";

type Params = {
  realEstates: RealEstate[]
}

export const SectionRealStates = ({realEstates}:Params) => {
  return (
    <div className="space-y-12 py-10">
      {realEstates.map((item, index) => (
        <div
          key={index}
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
              <button className="px-4 py-2 text-sm font-medium text-purple-700 bg-white rounded-full shadow-sm">
                Para los inquilinos
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-white rounded-full">
                Para los propietarios
              </button>
            </div>
            <h1 className="mt-6 text-start text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-xs md:max-w-md lg:max-w-lg">
              {item.description}
            </h1>

            <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
              {item.title}
            </p>
            <button className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-purple-700">
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};