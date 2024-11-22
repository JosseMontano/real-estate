import useGet from "@/core/hooks/useGet";
import { useModal } from "@/core/hooks/useModal";
import {
  deleteRealEstates,
  fetchRealEstates,
  getStadisticsRealEstates,
  postRealEstates,
} from "./api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import { useForm } from "@/core/hooks/useForm";
import { realEstateSchema } from "./interface/realEstate.schema";
import { SumaryCard } from "../dashboard/components/sumaryCards";
import { CustomerTable } from "../dashboard/components/customerTable";
import { ShowModal } from "@/core/components/form/modal";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import Select, { Option } from "@/core/components/form/select";
import { fetchTypeRe } from "../dashTypeRe/api/endpoints";
import { useState } from "react";
import { TypeRe } from "@/shared/types/typeRe";
import { RealEstateDTO, TypeRE } from "@/shared/types/realEstate";
import { useLanguageStore } from "@/core/store/language";
import useAuthStore from "@/core/store/auth";

type ParamsType = {};
export const DashRealEstates = ({}: ParamsType) => {
  const { user } = useAuthStore();
  const { isModalOpen, handleStateModal } = useModal();
  const {
    data: RealEstate,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchRealEstates,
    queryKey: ["RealEstate"],
    itemsPerPage: 10,
  });

  const { data: statistics, isLoading: isLoadingStatistics } = useGet({
    services: getStadisticsRealEstates,
    queryKey: ["RealEstate", RealEstate],
  });

  const { data: typeReResponse } = useGet({
    services: fetchTypeRe,
    queryKey: ["TypeRe"],
  });
  const [typeRE, setTypeRE] = useState<TypeRe | null>(null);
  const header = ["title", "active"];

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteRealEstates,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RealEstate"] });
    },
  });
  const {
    errors,
    handleOnSubmit,
    register,
    isPending,
    setSuccessMsg,
    setErrorMsg,
  } = useForm({
    schema: realEstateSchema,
    form: async (data) => {
      data.typeRealEstateId = typeRE?.id ?? 0;
      data.userId = 1;
      data.images = [];

      if (await postRealEstates(data)) {
        setSuccessMsg("Datos guardados correctamente");
        handleStateModal();
        queryClient.invalidateQueries({ queryKey: ["RealEstate"] });
      } else {
        setErrorMsg("Error al guardar");
        handleStateModal();
      }
    },
  });
  const { language } = useLanguageStore();
  return (
    <div>
      <SumaryCard
        amountActive={statistics?.active}
        amountInactive={statistics?.inactive}
        amountTotal={statistics?.total}
        isloading={isLoadingStatistics}
      />
      <ShowModal
        title="Agregar datos de inmueble"
        isModalOpen={isModalOpen}
        setIsModalOpen={handleStateModal}
        children={
          <FormComponent
            btnText="Guardar"
            handleOnSubmit={handleOnSubmit}
            isPending={isPending}
            children={
              <div className="grid grid-cols-2 gap-3">
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
                  text="Latitud y logitud"
                  error={errors.latLong}
                  register={register("latLong")}
                />
                <Select
                  value={
                    typeRE != undefined ? typeRE?.name[language] : undefined
                  }
                  onChange={(selectedOption) => {
                    setTypeRE(selectedOption);
                  }}
                  options={typeReResponse?.map((v: TypeRe) => ({
                    id: v.id,
                    name: v.name,
                  }))}
                />
              </div>
            }
          />
        }
      />
      <CustomerTable
        amountOfPages={amountOfPages}
        currentPage={currentPage}
        data={RealEstate}
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        setIsOpenModal={handleStateModal}
      />
    </div>
  );
};
