import { CustomerTable } from "../../core/components/dashboard/customerTable";
import { SumaryCard } from "../../core/components/dashboard/sumaryCards";
import {
  deleteQuestion,
} from "./api/endpoints";
import { useLanguageStore } from "@/core/store/language";
import { useDash } from "@/core/hooks/useDash";
import { Question } from "@/shared/types/questions";

export const DashQuestions = () => {
  /*   const {
    data: questions,
    fullData,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchQuestions,
    queryKey: ["questions"],
    itemsPerPage: 3,
  });

  const { data: statistics, isLoading: isLoadingStatistics } = useGet({
    services: getStadisticsQuestion,
    queryKey: ["question-statistics", questions],
  });

  const header = ["question", "active"];

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  const { texts } = useLanguageStore();
 */

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
    header: ["question", "active"],
    deleteService: deleteQuestion,
  });
  const { texts } = useLanguageStore();
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
