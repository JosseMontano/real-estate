import { useForm } from "@/core/hooks/useForm";
import { useModal } from "@/core/hooks/useModal";
import useNavigation from "@/core/hooks/useNavigate";
import useAuthStore from "@/core/store/auth";
import { useEffect } from "react";
import { realEstateSchema } from "./validations/realEstates.schema";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { addREToDB } from "./api/endpoints";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const { ShowModal, handleStateModal, isModalOpen } = useModal();

  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingRealEstate,
  } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      if (user) {
        await addREToDB(data, user);
      }
    },
  });

  useEffect(() => {
    if (user === null) {
      handleNavigate("/auth");
    }
  }, [user]);

  return (
    <div>
      <button onClick={handleStateModal}> crar </button>
      {isModalOpen && (
        <ShowModal
          title="Crear inmueble"
          children={
            <FormComponent
              handleOnSubmit={handleOnSubmit}
              isPending={isPendingRealEstate}
              btnText="Guardar"
              children={
                <>
                  <Input
                    text="Titulo"
                    error={errors.title}
                    register={register("title")}
                  />
                  <Input
                    text="Descripcion"
                    error={errors.description}
                    register={register("description")}
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
                  <Input
                    text="Direccion"
                    error={errors.address}
                    register={register("address")}
                  />
                  <Input
                    text="Latitud y longitud"
                    error={errors.latLong}
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

export default DashboardPage;
