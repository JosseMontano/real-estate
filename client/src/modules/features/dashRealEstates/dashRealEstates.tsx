import { deleteRealEstates, getREByType } from "./api/endpoints";
import { SumaryCard } from "../../core/components/dashboard/sumaryCards";
import { CustomerTable } from "../../core/components/dashboard/customerTable";
import { RealEstate } from "@/shared/types/realEstate";
import { useLanguageStore } from "@/core/store/language";
import { useDash } from "@/core/hooks/useDash";
import { TypeRe } from "@/shared/types/typeRe";

export const DashRealEstates = () => {
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
    selectData,
    selected,
    setSelected,
    tableDateFiltered,
    dataBySelectedId,
    mutateToState,
  } = useDash<RealEstate[], TypeRe[]>({
    url: "real_estates",
    header: [
      "title",
      "amount_bathroom",
      "amount_bedroom",
      "square_meter",
      "price",
      "active",
    ],
    selectUrl: "type-real-estates",
    deleteService: deleteRealEstates,
    getDataBySelectedId: getREByType,
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
      <CustomerTable
        fullData={fullData}
        amountOfPages={amountOfPages}
        currentPage={currentPage}
        data={
          Object.keys(selected).length === 0 ? tableDate : tableDateFiltered
        }
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        selectData={selectData}
        currentSelected={selected}
        setCurrentSelected={setSelected}
        tableTitle={texts.tableTile}
        handleGetReByType={dataBySelectedId}
        propSelectData="name"
      />
    </div>
  );
};
