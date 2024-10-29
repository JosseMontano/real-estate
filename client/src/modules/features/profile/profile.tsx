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
import { handlePost } from "@/core/utils/fetch";
import { Location, Map } from "@/core/components/form/maps";
import useGet from "@/core/hooks/useGet";
import { useLanguageStore } from "@/core/store/language";
import Select from "@/core/components/form/select";

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
        data.latLong = `${location?.lat}, ${location?.lng}`;
        const payload = {
          ubication: data.latLong,
        };
        const res = await handlePost("api/real-estate", payload);
        data.address = res.val;

        //save english title
        const payloadEn = {
          val: data.titleEs,
          from:"es",
          to:"en"
        }
        const resEn = await handlePost("api/translate", payloadEn);
        data.titleEn = resEn.val;

        //save portuguese title
        const payloadPt = {
          val: data.titleEs,
          from:"es",
          to:"pt"
        }
        const resPt = await handlePost("api/translate", payloadPt);
        data.titlePt = resPt.val;

        //save english description
        const payloadEnDes = {
          val: data.descriptionEs,
          from:"es",
          to:"en"
        }
        const resEnDes = await handlePost("api/translate", payloadEnDes);
        data.descriptionEn = resEnDes.val;

        //save portuguese description
        const payloadPtDes = {
          val: data.descriptionEs,
          from:"es",
          to:"pt"
        }
        const resPtDes = await handlePost("api/translate", payloadPtDes);
        data.descriptionPt = resPtDes.val;
      
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
