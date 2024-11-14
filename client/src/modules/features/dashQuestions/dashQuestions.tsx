import useGet from "@/core/hooks/useGet";
import { CustomerTable } from "../dashboard/components/customerTable";
import { SumaryCard } from "../dashboard/components/sumaryCards";
import { deleteQuestion, fetchQuestions } from "./api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App";

type ParamsType = {};
export const DashQuestions = ({}: ParamsType) => {
  const {
    data: questions,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchQuestions,
    queryKey: "questions",
    itemsPerPage: 3,
  });

  const header = ["question", "active"];

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });

  return (
    <div>
      <SumaryCard />
      <CustomerTable
        header={header}
        data={questions}
        handleState={mutateToState}
        amountOfPages={amountOfPages}
        currentPage={currentPage}
        handlePagination={handlePagination}
        isloading={isLoading}
      />
    </div>
  );
};
