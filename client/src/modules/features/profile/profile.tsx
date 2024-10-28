import { useForm } from "@/core/hooks/useForm";
import { useModal } from "@/core/hooks/useModal";
import useNavigation from "@/core/hooks/useNavigate";
import useAuthStore from "@/core/store/auth";
import { useEffect, useState } from "react";
import { realEstateSchema } from "./validations/realEstates.schema";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { addREToDB } from "./api/endpoints";
import { ShowModal } from "@/core/components/form/modal";
import { handlePost } from "@/core/utils/fetch";
import { Location, Map } from "@/core/components/form/maps";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const { handleStateModal, isModalOpen } = useModal();
  const [location, setLocation] = useState<Location | null>(null);

  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingRealEstate,
    reset,
  } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      if (user) {
        data.latLong = `${location?.lat}, ${location?.lng}`;
        const payload = {
          ubication: data.latLong,
        };
        const res = await handlePost("api/real-estate", payload);
        data.address = res.val;

        await addREToDB(data, user);

        handleStateModal();
        reset();
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

      <ShowModal
        title="Crear inmueble"
        isModalOpen={isModalOpen}
        setIsModalOpen={handleStateModal}
        children={
          <FormComponent
            handleOnSubmit={handleOnSubmit}
            isPending={isPendingRealEstate}
            btnText="Guardar"
            children={
              <div className="grid grid-cols-2 gap-3 ">
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
              </div>
            }
            children2={<Map location={location} setLocation={setLocation} />}
          />
        }
      />
    </div>
  );
};

export default DashboardPage;
