import { CustomerTable } from "../../core/components/dashboard/customerTable";
import { SumaryCard } from "../../core/components/dashboard/sumaryCards";
import {
  deleteQuestion,
} from "./api/endpoints";
import { useLanguageStore } from "@/core/store/language";
import { useDash } from "@/core/hooks/useDash";
import { Question } from "@/shared/types/questions";

export const DashQuestions = () => {
  const { texts } = useLanguageStore();
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
  } = useDash<Question[], null>({
    url: "questions",
    header: [
      {
        key: "question",
        val:texts.question,
      },
      {
        key: "active",
        val: texts.active,
      },
    ],
    deleteService: deleteQuestion,
  });

  return (
    <div>
      <SumaryCard
        amountTotal={statistics?.total}
        amountActive={statistics?.active}
        amountInactive={statistics?.inactive}
        isloading={isLoadingStatistics}
      />
      <CustomerTable
        fullData={fullData}
        header={header}
        data={tableDate}
        handleState={mutateToState}
        amountOfPages={amountOfPages}
        currentPage={currentPage}
        handlePagination={handlePagination}
        isloading={isLoading}
        tableTitle={texts.questions}
      />
    </div>
  );
};
