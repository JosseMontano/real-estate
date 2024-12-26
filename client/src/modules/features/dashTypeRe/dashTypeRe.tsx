import { ShowModal } from "@/core/components/form/modal";
import { SumaryCard } from "../../core/components/dashboard/sumaryCards";
import { useModal } from "@/core/hooks/useModal";
import { CustomerTable } from "../../core/components/dashboard/customerTable";
import { deleteTypeRe, postTypeRe } from "./api/endpoints";
import { queryClient } from "../../../App";
import FormComponent from "@/core/components/form/form";
import { useForm } from "@/core/hooks/useForm";
import { typeReSchema } from "./interface/typeRe.schema";
import { Input } from "@/core/components/form/input";
import { useLanguageStore } from "@/core/store/language";
import { useDash } from "@/core/hooks/useDash";

export const DashTypeRe = () => {
  const { isModalOpen, handleStateModal } = useModal();
  const { texts, language } = useLanguageStore();
  const {
    tableDate,
    amountOfPages,
    currentPage,
    fullData,
    handlePagination,
    isLoading,
    isLoadingStatistics,
    statistics,
    header,
    mutateToState,
  } = useDash<Comment[], null>({
    url: "type-real-estates",
    header: [
      {
        key: "name",
        val: texts.nameTypeRE,
      },
      {
        key: "active",
        val: texts.active,
      }
      ],
    deleteService: deleteTypeRe,
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
        setSuccessMsg(res.message[language]);
        return;
      }
      setErrorMsg(res.message[language]);
    },
  });

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
        data={tableDate}
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
