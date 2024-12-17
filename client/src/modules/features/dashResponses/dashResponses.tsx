import {
  deleteReponse,
  getResponsesByQuestion,
} from "./api/endpoints";
import { Question, Response } from "@/shared/types/questions";
import { SumaryCard } from "../../core/components/dashboard/sumaryCards";
import { CustomerTable } from "../../core/components/dashboard/customerTable";
import { useLanguageStore } from "@/core/store/language";
import { useDash } from "@/core/hooks/useDash";

type ParamsType = {};
export const DashResponses = ({}: ParamsType) => {

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
  } = useDash<Response[], Question[]>({
    url: "responses",
    header: ["response", "active"],
    selectUrl: "questions",
    deleteService: deleteReponse,
    getDataBySelectedId: getResponsesByQuestion,
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
          Object.keys(selected).length === 0
            ? tableDate
            : tableDateFiltered
        }
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        selectData={selectData}
        currentSelected={selected}
        setCurrentSelected={setSelected}
        tableTitle={texts.responses}
        handleGetReByType={dataBySelectedId}
        propSelectData="question"
      />
    </div>
  );
};
