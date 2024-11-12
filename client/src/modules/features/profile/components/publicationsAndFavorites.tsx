import img1 from "@/shared/assets/bg.jpg";
import Btn from "@/core/components/form/button";
import { ShowModal } from "@/core/components/form/modal";
import { useState } from "react";
type ParamsType = {
  isModalOpen: boolean;
  handleShowModal: () => void;
};
export const PublicationsAndFavorites = ({
  handleShowModal,
  isModalOpen,
}: ParamsType) => {
  const publicationsFirtsRow = [
    {
      id: "pub1",
      title: "Publicación 1",
      img: img1,
      description: "Contenido de la publicación 1",
      titleHouse: "La casa de hallowen",
    },
    {
      id: "pub2",
      title: "Publicación 2",
      img: img1,
      description: "Contenido de la publicación 2",
      titleHouse: "La casa de hallowen",
    },
    {
      id: "pub3",
      title: "Publicación 3",
      img: img1,
      description: "Contenido de la publicación 3",
      titleHouse: "La casa de hallowen",
    },
  ];

  const [currentRE, setCurrentRE] = useState({});

  return (
    <div>
      <div className="flex">
        <div className="flex overflow-x-scroll gap-4 scrollbar-hide ">
          {publicationsFirtsRow.map((publication) => (
            <div
              key={publication.id}
              className="max-w-xs p-2 flex flex-shrink-0 "
            >
              <div className="flex flex-col justify-center gap-3">
                <img
                  src={img1}
                  alt="Imagen"
                  className="w-full rounded-lg shadow-lg "
                />
                <Btn
                  text="Ver mas"
                  isPending={false}
                  onClick={() => {
                    setCurrentRE(publication);
                    handleShowModal();
                  }}
                />
              </div>
            </div>
          ))}

          {
            <ShowModal
              isModalOpen={isModalOpen}
              setIsModalOpen={handleShowModal}
              title={currentRE.title}
              children={
                <div className="max-w-md  p-4 flex flex-col gap-7 ">
                  <div className="flex flex-col justify-center w-full">
                    <img
                      src={currentRE.img}
                      alt="Imagen"
                      className="w-full rounded-lg shadow-lg "
                    />
                  </div>

                  <div
                    className={`flex flex-col items-center text-center w-full`}
                  >
                    <div className="flex space-x-4 bg-gray-100 p-2 rounded-full">
                      <button className="px-4 py-2 text-sm font-medium text-purple-700 bg-white rounded-full shadow-sm">
                        Para los inquilinos
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-white rounded-full">
                        Para los propietarios
                      </button>
                    </div>
                    <h1 className="mt-6 text-justify font-bold text-gray-900 max-w-xs md:max-w-md lg:max-w-lg">
                      {currentRE.description}
                    </h1>

                    <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                      {currentRE.titleHouse}
                    </p>
                  </div>
                </div>
              }
            />
          }
        </div>
      </div>
    </div>
  );
};