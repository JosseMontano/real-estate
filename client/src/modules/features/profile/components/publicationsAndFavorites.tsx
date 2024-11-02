import { useRef } from "react";
import img1 from "@/shared/assets/bg.jpg";
import { ModalType } from "@/core/hooks/useModal";
import Btn from "@/core/components/form/button";
type ParamsType = {
  handleStateModal: (modalId: string) => void;
  modalStates: { [key: string]: boolean };
  ShowModal: ({ children, title, modalId }: ModalType & { modalId: string }) => JSX.Element;
};
export const PublicationsAndFavorites = ({
  ShowModal,
  modalStates,
  handleStateModal,
}: ParamsType) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef2 = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, distance: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  const scrollLeft = () => scroll(scrollContainerRef, -300);
  const scrollRight = () => scroll(scrollContainerRef, 300);
  const scrollLeft2 = () => scroll(scrollContainerRef2, -300);
  const scrollRight2 = () => scroll(scrollContainerRef2, 300);

  const publicationsFirtsRow = [
    { id: "pub1", title: "Publicación 1",img:img1, description: "Contenido de la publicación 1", titleHouse:"La casa de hallowen" },
    { id: "pub2", title: "Publicación 2",img:img1, description: "Contenido de la publicación 2", titleHouse:"La casa de hallowen" },
    { id: "pub3", title: "Publicación 3",img:img1, description: "Contenido de la publicación 3", titleHouse:"La casa de hallowen" },
  ];
  const publicationsSecondRow = [
    { id: "pub4", title: "Publicación 4",img:img1, description: "Contenido de la publicación 4", titleHouse:"La casa de hallowen" },
    { id: "pub5", title: "Publicación 5",img:img1, description: "Contenido de la publicación 5", titleHouse:"La casa de hallowen" },
    { id: "pub6", title: "Publicación 6",img:img1, description: "Contenido de la publicación 6", titleHouse:"La casa de hallowen" },
  ];
  return (
    <div>
      <div className="flex">
        <button onClick={scrollLeft} className=" text-2xl font-bold">
          {"<"}
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll gap-4 scrollbar-hide "
        >
          {publicationsFirtsRow.map((publication)=>(
            <div key={publication.id} className="max-w-xs p-2 flex flex-shrink-0 ">
            <div className="flex flex-col justify-center gap-3">
              <img
                src={img1}
                alt="Imagen"
                className="w-full rounded-lg shadow-lg "
              />
              <Btn
                text="Ver mas"
                isPending={false}
                onClick={()=>handleStateModal(publication.id)}
              />
              {(
                <ShowModal
                modalId={publication.id}
                  title={publication.title}
                  children={
                    <div className="max-w-md  p-4 flex flex-col gap-7 ">
                      <div className="flex flex-col justify-center w-full">
                        <img
                          src={publication.img}
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
                          {publication.description}
                        </h1>

                        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                          {publication.titleHouse}
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
          ))}
        </div>
        <button onClick={scrollRight} className="text-2xl font-bold">{">"}</button>
      </div>
      <div className="flex">
        <button onClick={scrollLeft2} className="text-2xl font-bold">
          {"<"}
        </button>

        <div
          ref={scrollContainerRef2}
          className="flex overflow-x-scroll gap-4 scrollbar-hide "
        >
          {publicationsSecondRow.map((publication)=>(
            <div key={publication.id} className="max-w-xs p-2 flex flex-shrink-0 ">
            <div className="flex flex-col justify-center gap-3">
              <img
                src={img1}
                alt="Imagen"
                className="w-full rounded-lg shadow-lg "
              />
              <Btn
                text="Ver mas"
                isPending={false}
                onClick={()=>handleStateModal(publication.id)}
              />
              {(
                <ShowModal
                modalId={publication.id}
                  title={publication.title}
                  children={
                    <div className="max-w-md  p-4 flex flex-col gap-7 ">
                      <div className="flex flex-col justify-center w-full">
                        <img
                          src={publication.img}
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
                          {publication.description}
                        </h1>

                        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                          {publication.titleHouse}
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
          ))}
        </div>
        <button onClick={scrollRight2} className="text-2xl font-bold">{">"}</button>
      </div>
    </div>
  );
};
