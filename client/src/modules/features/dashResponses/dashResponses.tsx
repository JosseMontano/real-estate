import useGet from "@/core/hooks/useGet";
import {
  deleteReponse,
  fetchReponses,
  getResponsesByQuestion,
  getStatiticsResponses,
} from "./api/endpoints";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Response } from "@/shared/types/questions";
import { queryClient } from "../../../App";
import { fetchQuestions } from "../dashQuestions/api/endpoints";
import { SumaryCard } from "../dashboard/components/sumaryCards";
import { CustomerTable } from "../dashboard/components/customerTable";
import { useLanguageStore } from "@/core/store/language";

type ParamsType = {};
export const DashResponses = ({}: ParamsType) => {
  const {
    data: Responses,
    fullData,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchReponses,
    queryKey: ["Responses"],
    itemsPerPage: 10,
  });

  const { data: statistics, isLoading: isLoadingStatistics } = useGet({
    services: getStatiticsResponses,
    queryKey: ["statistics-reponses", Responses],
  });
  const header = ["response", "active"];
  const [filteredResponses, setFilteredResponses] = useState<Response[]>([]);
  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteReponse,
    onSuccess: async (data) => {
      setFilteredResponses((prevFiltered) =>
        prevFiltered
          .map((item) =>
            item.id === data.val.id ? { ...item, active: !item.active } : item
          )
          .filter((item) => prevFiltered.some((prev) => prev.id === item.id))
      );

      queryClient.invalidateQueries({ queryKey: ["Responses"] });
    },
  });

  const { data: DataQuestion } = useGet({
    services: fetchQuestions,
    queryKey: ["Questions"],
  });
  const { mutate: dataCommByRe } = useMutation({
    mutationFn: getResponsesByQuestion,
    onSuccess: (data) => {
      setFilteredResponses(data.val);
    },
  });
  const [currentSelectedRE, setCurrentSelectedRE] = useState({} as Response);

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
          Object.keys(currentSelectedRE).length === 0
            ? Responses
            : filteredResponses
        }
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        selectData={DataQuestion}
        currentSelected={currentSelectedRE}
        setCurrentSelected={setCurrentSelectedRE}
        tableTitle={texts.responses}
        handleGetReByType={dataCommByRe}
        propSelectData="question"
      />
    </div>
  );
};
