import { useRef } from "react";
import img1 from "@/shared/assets/BR.jpg";
import { ModalType } from "@/core/hooks/useModal";
import Btn from "@/core/components/form/button";
type ParamsType = {
  handleStateModal: () => void;
  isModalOpen: boolean;
  ShowModal: ({ children, title }: ModalType) => JSX.Element;
};
export const PublicationsAndFavorites = ({
  ShowModal,
  isModalOpen,
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
  return (
    <div>
      <div className="flex">
        <button onClick={scrollLeft} className="">
          {"<"}
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll gap-4 scrollbar-hide "
        >
          <div className="max-w-xs p-2 flex flex-shrink-0 ">
            <div className="flex flex-col justify-center gap-3">
              <img
                src={img1}
                alt="Imagen"
                className="w-full rounded-lg shadow-lg "
              />
              <Btn
                text="Ver más"
                isPending={false}
                onClick={handleStateModal}
              />
              {isModalOpen && (
                <ShowModal
                  title="Mas informacion"
                  children={
                    <div className="max-w-md  p-4 flex flex-col gap-7 ">
                      <div className="flex flex-col justify-center w-full">
                        <img
                          src={img1}
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Excepturi ullam illum tempore porro, beatae
                          voluptatibus placeat incidunt, amet tempora illo
                          doloribus modi ad praesentium accusamus voluptatem
                          debitis iusto velit deleniti!
                        </h1>

                        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                          La casa de hallowen
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
          <div className="max-w-xs p-2 flex flex-shrink-0 ">
            <div className="flex flex-col justify-center gap-3">
              <img
                src={img1}
                alt="Imagen"
                className="w-full rounded-lg shadow-lg "
              />
              <Btn
                text="Ver más"
                isPending={false}
                onClick={handleStateModal}
              />
              {isModalOpen && (
                <ShowModal
                  title="Mas informacion"
                  children={
                    <div className="max-w-md  p-4 flex flex-col gap-7 ">
                      <div className="flex flex-col justify-center w-full">
                        <img
                          src={img1}
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Excepturi ullam illum tempore porro, beatae
                          voluptatibus placeat incidunt, amet tempora illo
                          doloribus modi ad praesentium accusamus voluptatem
                          debitis iusto velit deleniti!
                        </h1>

                        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                          La casa de hallowen
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
          <div className="max-w-xs p-2 flex flex-shrink-0 ">
            <div className="flex flex-col justify-center gap-3">
              <img
                src={img1}
                alt="Imagen"
                className="w-full rounded-lg shadow-lg "
              />
              <Btn
                text="Ver más"
                isPending={false}
                onClick={handleStateModal}
              />
              {isModalOpen && (
                <ShowModal
                  title="Mas informacion"
                  children={
                    <div className="max-w-md  p-4 flex flex-col gap-7 ">
                      <div className="flex flex-col justify-center w-full">
                        <img
                          src={img1}
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Excepturi ullam illum tempore porro, beatae
                          voluptatibus placeat incidunt, amet tempora illo
                          doloribus modi ad praesentium accusamus voluptatem
                          debitis iusto velit deleniti!
                        </h1>

                        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                          La casa de hallowen
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </div>
        <button onClick={scrollRight}>{">"}</button>
      </div>
      <div className="flex">
        <button onClick={scrollLeft2} className="">
          {"<"}
        </button>

        <div
          ref={scrollContainerRef2}
          className="flex overflow-x-scroll gap-4 scrollbar-hide "
        >
          <div className="max-w-xs p-2 flex flex-shrink-0 ">
            <div className="flex flex-col justify-center gap-3">
              <img
                src={img1}
                alt="Imagen"
                className="w-full rounded-lg shadow-lg "
              />
              <Btn
                text="Ver más"
                isPending={false}
                onClick={handleStateModal}
              />
              {isModalOpen && (
                <ShowModal
                  title="Mas informacion"
                  children={
                    <div className="max-w-md  p-4 flex flex-col gap-7 ">
                      <div className="flex flex-col justify-center w-full">
                        <img
                          src={img1}
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Excepturi ullam illum tempore porro, beatae
                          voluptatibus placeat incidunt, amet tempora illo
                          doloribus modi ad praesentium accusamus voluptatem
                          debitis iusto velit deleniti!
                        </h1>

                        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                          La casa de hallowen
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
          <div className="max-w-xs p-2 flex flex-shrink-0 ">
            <div className="flex flex-col justify-center gap-3">
              <img
                src={img1}
                alt="Imagen"
                className="w-full rounded-lg shadow-lg "
              />
              <Btn
                text="Ver más"
                isPending={false}
                onClick={handleStateModal}
              />
              {isModalOpen && (
                <ShowModal
                  title="Mas informacion"
                  children={
                    <div className="max-w-md  p-4 flex flex-col gap-7 ">
                      <div className="flex flex-col justify-center w-full">
                        <img
                          src={img1}
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Excepturi ullam illum tempore porro, beatae
                          voluptatibus placeat incidunt, amet tempora illo
                          doloribus modi ad praesentium accusamus voluptatem
                          debitis iusto velit deleniti!
                        </h1>

                        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                          La casa de hallowen
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
          <div className="max-w-xs p-2 flex flex-shrink-0 ">
            <div className="flex flex-col justify-center gap-3">
              <img
                src={img1}
                alt="Imagen"
                className="w-full rounded-lg shadow-lg "
              />
              <Btn
                text="Ver más"
                isPending={false}
                onClick={handleStateModal}
              />
              {isModalOpen && (
                <ShowModal
                  title="Mas informacion"
                  children={
                    <div className="max-w-md  p-4 flex flex-col gap-7 ">
                      <div className="flex flex-col justify-center w-full">
                        <img
                          src={img1}
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
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Excepturi ullam illum tempore porro, beatae
                          voluptatibus placeat incidunt, amet tempora illo
                          doloribus modi ad praesentium accusamus voluptatem
                          debitis iusto velit deleniti!
                        </h1>

                        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify">
                          La casa de hallowen
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </div>
        <button onClick={scrollRight2}>{">"}</button>
      </div>
    </div>
  );
};
