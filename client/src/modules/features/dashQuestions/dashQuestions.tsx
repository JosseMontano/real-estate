import useGet from "@/core/hooks/useGet";
import { CustomerTable } from "../dashboard/components/customerTable";
import { SumaryCard } from "../dashboard/components/sumaryCards";
import {
  deleteQuestion,
  fetchQuestions,
  getStadisticsQuestion,
} from "./api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import { useModal } from "@/core/hooks/useModal";
import { ShowModal } from "@/core/components/form/modal";
import { useLanguageStore } from "@/core/store/language";

export const DashQuestions = () => {
  const {
    data: questions,
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

  return (
    <div>
      <SumaryCard
        amountTotal={statistics?.total}
        amountActive={statistics?.active}
        amountInactive={statistics?.inactive}
        isloading={isLoadingStatistics}
      />
      <CustomerTable
        header={header}
        data={questions}
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
