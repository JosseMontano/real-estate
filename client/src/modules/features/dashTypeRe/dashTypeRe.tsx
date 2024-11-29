import { ShowModal } from "@/core/components/form/modal";
import { SumaryCard } from "../dashboard/components/sumaryCards";
import { useModal } from "@/core/hooks/useModal";
import { CustomerTable } from "../dashboard/components/customerTable";
import useGet from "@/core/hooks/useGet";
import {
  deleteTypeRe,
  fetchTypeRe,
  getStadisticsTypeRe,
  postTypeRe,
} from "./api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import FormComponent from "@/core/components/form/form";
import { useForm } from "@/core/hooks/useForm";
import { typeReSchema } from "./interface/typeRe.schema";
import { Input } from "@/core/components/form/input";
import { useLanguageStore } from "@/core/store/language";

type ParamsType = {};
export const DashTypeRe = ({}: ParamsType) => {
  const { isModalOpen, handleStateModal } = useModal();
  const {
    data: TypeRe,
    fullData,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchTypeRe,
    queryKey: ["TypeRe"],
    itemsPerPage: 5,
  });

  const { data: statistics, isLoading: isLoadingStatistics } = useGet({
    services: getStadisticsTypeRe,
    queryKey: ["TypeRe-statistics", TypeRe],
  });

  const header = ["name", "active"];

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteTypeRe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TypeRe"] });
    },
  });

  const {
    errors,
    handleOnSubmit,
    register,
    isPending,
    setErrorMsg,
    setSuccessMsg,
  } = useForm({
    schema: typeReSchema,
    form: async (data) => {
      const res = await postTypeRe(data);
      if (res.status == 200 || res.status == 201) {
        queryClient.invalidateQueries({ queryKey: ["TypeRe"] });
        handleStateModal();
        setSuccessMsg(res.message);
        return;
      }
      setErrorMsg(res.message);
    },
  });
  const { texts } = useLanguageStore();
  return (
    <div>
      <SumaryCard
        amountActive={statistics?.active}
        amountInactive={statistics?.inactive}
        amountTotal={statistics?.total}
        isloading={isLoadingStatistics}
      />
      <ShowModal
        title="Agregar Tipo de inmueble"
        isModalOpen={isModalOpen}
        setIsModalOpen={handleStateModal}
        children={
          <FormComponent
            btnText="Guardar"
            handleOnSubmit={handleOnSubmit}
            isPending={isPending}
            children={
              <>
                <Input
                  text="Tipo de inmueble"
                  error={errors.name}
                  register={register("name")}
                />
              </>
            }
          />
        }
      />
      <CustomerTable
        fullData={fullData}
        amountOfPages={amountOfPages}
        currentPage={currentPage}
        data={TypeRe}
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        setIsOpenModal={handleStateModal}
        tableTitle={texts.propertyType}
      />
    </div>
  );
};
