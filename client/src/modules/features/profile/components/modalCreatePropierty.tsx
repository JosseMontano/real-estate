import Btn from "@/core/components/form/button";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { ModalType } from "@/core/hooks/useModal";
import { RealEstate } from "@/shared/types/realEstate";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type RegisterFields = Omit<RealEstate, "userId" | "user" | "available">;
type ParamsType = {
  handleStateModal: () => void;
  isModalOpen: boolean;
  ShowModal: ({ children, title }: ModalType) => JSX.Element;
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPendingRe: boolean;
  errors: FieldErrors<RealEstate> | undefined;
  register: UseFormRegister<RegisterFields>;
};
export const ModalCreatePropierty = ({
  ShowModal,
  errors,
  handleOnSubmit,
  handleStateModal,
  isModalOpen,
  isPendingRe,
  register,
}: ParamsType) => {
  return (
    <div className="flex justify-end  ">
      <Btn
        isPending={false}
        text="Crear Propiedad"
        onClick={handleStateModal}
        className="max-w-max px-2"
      />
      {isModalOpen && (
        <ShowModal
          title="Crear inmueble"
          children={
            <FormComponent
              handleOnSubmit={handleOnSubmit}
              isPending={isPendingRe}
              btnText="Guardar"
              children={
                <>
                  <Input
                    text="Titulo"
                    error={errors?.title}
                    register={register("title")}
                  />
                  <Input
                    text="Descripcion"
                    error={errors?.description}
                    register={register("description")}
                  />
                  <Input
                    text="Precio"
                    error={errors?.price}
                    register={register("price")}
                  />
                  <Input
                    text="Habitaciones"
                    error={errors?.amountBedroom}
                    register={register("amountBedroom")}
                  />
                  <Input
                    text="Baños"
                    error={errors?.amountBathroom}
                    register={register("amountBathroom")}
                  />
                  <Input
                    text="Metros cuadrados"
                    error={errors?.squareMeter}
                    register={register("squareMeter")}
                  />
                  <Input
                    text="Direccion"
                    error={errors?.address}
                    register={register("address")}
                  />
                  <Input
                    text="Latitud y longitud"
                    error={errors?.latLong}
                    register={register("latLong")}
                  />
                </>
              }
            />
          }
        />
      )}
    </div>
  );
};
