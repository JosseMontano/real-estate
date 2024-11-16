import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RealEstateDTO } from "../api/dtos";
import Select from "@/core/components/form/select";
import { Location, Map } from "@/core/components/map/maps";
import { ChangeEvent } from "react";
import useGet from "@/core/hooks/useGet";
import { fetchTypesRE } from "../api/endpoints";
import { useLanguageStore } from "@/core/store/language";
import { ShowModal } from "@/core/components/form/modal";
import { TypeRE } from "@/shared/types/realEstate";
import Btn from "@/core/components/form/button";
import { FileStatus } from "../profile";
import { UploadImage } from "@/shared/assets/icons/uploadImage";
import { ArrowDownIcon } from "@/shared/assets/icons/arrowDown";

type ParamsType = {
  handleStateModal: () => void;
  isModalOpen: boolean;
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPendingRE: boolean;
  errors: FieldErrors<RealEstateDTO>;
  register: UseFormRegister<RealEstateDTO>;
  handleImageSelection: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  setTypeRE: (val: TypeRE) => void;
  typeRE: TypeRE;
  location: Location | null;
  setLocation: (val: Location | null) => void;
  toggleExpand: () => void;
  isExpanded: boolean;
  fileUrl: string[];
  filesSelected: FileStatus[];
  countFilesUp: number[];
};
export const ModalCreatePropierty = ({
  errors,
  handleOnSubmit,
  handleStateModal,
  isModalOpen,
  isPendingRE,
  register,
  handleImageSelection,
  setTypeRE,
  typeRE,
  location,
  setLocation,
  toggleExpand,
  isExpanded,
  fileUrl,
  filesSelected,
  countFilesUp,
}: ParamsType) => {
  const { data } = useGet({
    itemsPerPage: 10,
    queryKey: ["type-realEstates"],
    services: fetchTypesRE,
  });

  const { language } = useLanguageStore();

  console.log(language);
  console.log(typeRE);
  return (
    <>
      <Btn
        text="Crear inmueble"
        onClick={handleStateModal}
        isPending={false}
        className="max-w-max px-2"
      />
      <ShowModal
        title="Crear inmueble"
        isModalOpen={isModalOpen}
        setIsModalOpen={handleStateModal}
        children={
          <FormComponent
            handleOnSubmit={handleOnSubmit}
            isPending={isPendingRE}
            btnText="Guardar"
            children={
              <>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    text="Titulo"
                    error={errors.titleEs}
                    register={register("titleEs")}
                  />
                  <Input
                    text="Descripcion"
                    error={errors.descriptionEs}
                    register={register("descriptionEs")}
                  />
                  <Input
                    text="Precio"
                    error={errors.price}
                    register={register("price")}
                  />
                  <Input
                    text="Habitaciones"
                    error={errors.amountBedroom}
                    register={register("amountBedroom")}
                  />
                  <Input
                    text="Baños"
                    error={errors.amountBathroom}
                    register={register("amountBathroom")}
                  />
                  <Input
                    text="Metros cuadrados"
                    error={errors.squareMeter}
                    register={register("squareMeter")}
                  />
                  <Select
                    value={
                      typeRE.name != undefined
                        ? typeRE.name[language]
                        : undefined
                    }
                    onChange={(val: TypeRE) => {
                      setTypeRE(val);
                      console.log(val);
                    }}
                    options={data?.map((v) => ({
                      name: v.name,
                      id: v.id,
                    }))}
                  />
                </div>

                <div className="flex flex-col gap-2 ">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleImageSelection}
                    multiple
                    accept="/*"
                  />
                  <div
                    className="flex max-w-max p-2  gap-2 rounded-lg"
                    style={{ background: "#353535" }}
                  >
                    <UploadImage size="20" />
                    <label
                      htmlFor="fileInput"
                      className="text-white cursor-pointer"
                    >
                      Buscar imagen
                    </label>
                  </div>
                </div>
                {
                  <div className="h-70 overflow-y-auto">
                    {filesSelected.length !== 0 && (
                      <>
                        <button
                          onClick={toggleExpand}
                          className="flex items-center gap-2"
                        >
                          <ArrowDownIcon size="15" />
                          <span>
                            {countFilesUp.length} de {filesSelected.length}{" "}
                            archivos subidos
                          </span>
                        </button>

                        {isExpanded && (
                          <>
                            {filesSelected.map((value, index) => (
                              <>
                                <ul className="flex flex-col gap-5 py-3 px-3">
                                  <div className="flex items-center  ">
                                    <span className="w-4 text-center p-0 rounded-full bg-[#63bacb] text-white text-xs">
                                      {index + 1}
                                    </span>
                                    <div className="w-5 h-[3px] bg-[#63bacb] ml-1" />
                                    <div className="flex border-2 border-[#d3d3d3] h-16 w-full items-center gap-5 ">
                                      {filesSelected[index]?.status === true ? (
                                        <span>Subiendo...</span>
                                      ) : (
                                        <>
                                          <img
                                            className="basis-3/12 md:basis-2/12 p-0 h-full w-full"
                                            src={fileUrl[index]}
                                            alt="image"
                                          />
                                        </>
                                      )}
                                      <>
                                        <span className="basis-8/12 md:basis-9/12">
                                          {value.name}
                                        </span>

                                        <button className="basis-1/12 md:basis-1/12 text-[#beeaff] text-xl font-normal px-5">
                                          X
                                        </button>
                                      </>
                                    </div>
                                  </div>
                                </ul>
                              </>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </div>
                }
              </>
            }
            children2={<Map location={location} setLocation={setLocation} />}
          />
        }
      />
    </>
  );
};
