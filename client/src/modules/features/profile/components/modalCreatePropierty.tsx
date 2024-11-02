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


type ParamsType = {
  handleStateModal: () => void;
  isModalOpen: boolean;
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPendingRE: boolean;
  errors: FieldErrors<RealEstateDTO>;
  register: UseFormRegister<RealEstateDTO>;
  handleImageSelection: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
  uploadStatus: string[]
  setTypeRE: (val: TypeRE) => void;
  typeRE: TypeRE;
  location: Location | null
  setLocation: (val: Location | null) => void
};
export const ModalCreatePropierty = ({
  errors,
  handleOnSubmit,
  handleStateModal,
  isModalOpen,
  isPendingRE,
  register,
  handleImageSelection,
  uploadStatus,
  setTypeRE,
  typeRE,
  location,
  setLocation
}: ParamsType) => {
  
  
  const { data } = useGet({
    itemsPerPage: 10,

    queryKey: "type-realEstates",
    services: fetchTypesRE,
  });

  const {language} = useLanguageStore()

  return (
    <>
    <Btn text="Crear inmueble" onClick={handleStateModal} isPending={false}/>
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
                  value={typeRE}
                  onChange={(val: TypeRE) => {
                    setTypeRE(val);
                  }}
                  options={data?.map((v) => ({
                    value: v.name[language],
                    id: v.id,
                  }))}
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelection}
                />
                <div>
                  <h3>Upload Status:</h3>
                  <ul>
                    {uploadStatus.map((status, index) => (
                      <li key={index}>{status}</li>
                    ))}
                  </ul>
                </div>
              </div>
            }
            children2={<Map location={location} setLocation={setLocation} />}
          />
        }
      />
    </>
  );
};
