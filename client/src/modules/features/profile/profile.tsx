import { useForm } from "@/core/hooks/useForm";
import { useModal } from "@/core/hooks/useModal";
import useNavigation from "@/core/hooks/useNavigate";
import useAuthStore from "@/core/store/auth";
import { useEffect, useState } from "react";
import { realEstateSchema } from "./validations/realEstates.schema";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { addREToDB, fetchTypesRE } from "./api/endpoints";
import { ShowModal } from "@/core/components/form/modal";
import { Location, Map } from "@/core/components/form/maps";
import useGet from "@/core/hooks/useGet";
import { useLanguageStore } from "@/core/store/language";
import Select from "@/core/components/form/select";
import { getTheValues } from "./utils/getTheValues";

const DashboardPage = () => {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const { handleStateModal, isModalOpen } = useModal();
  const [location, setLocation] = useState<Location | null>(null);
  const [typeRE, setTypeRE] = useState("");

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
        const res = await getTheValues(data, location);
        data = res;

        await addREToDB(data, user);

        handleStateModal();
        reset();
      }
    },
  });

  const { data } = useGet({
    itemsPerPage: 10,

    queryKey: "type-realEstates",
    services: fetchTypesRE,
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
                  onChange={(e) => setTypeRE(e.target.value)}
                  options={data?.map((v) => ({
                    value: v.name[language],
                    label: v.name[language],
                  }))}
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
