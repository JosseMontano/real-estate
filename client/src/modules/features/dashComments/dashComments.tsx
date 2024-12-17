import useGet from "@/core/hooks/useGet";
import { deleteComment, getCommentsByRe } from "./api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { Comment } from "@/shared/types/questions";
import { useState } from "react";
import { queryClient } from "../../../App";
import { SumaryCard } from "../../core/components/dashboard/sumaryCards";
import { CustomerTable } from "../../core/components/dashboard/customerTable";
import { RealEstate } from "@/shared/types/realEstate";
import { useLanguageStore } from "@/core/store/language";
import { useDash } from "@/core/hooks/useDash";

export const DashComments = () => {

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
  } = useDash<Comment[], RealEstate[]>({
    url: "comments",
    header: ["comment", "amount_star", "active"],
    selectUrl: "real_estates",
  });

  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (data) => {
      setFilteredComments((prevFiltered) =>
        prevFiltered
          .map((item) =>
            item.id === data.val.id ? { ...item, active: !item.active } : item
          )
          .filter((item) => prevFiltered.some((prev) => prev.id === item.id))
      );

      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const { mutate: dataCommByRe } = useMutation({
    mutationFn: getCommentsByRe,
    onSuccess: (data) => {
      setFilteredComments(data.val);
    },
  });

  const [currentSelectedRE, setCurrentSelectedRE] = useState({} as RealEstate);

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
            ? tableDate
            : filteredComments
        }
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        selectData={selectData}
        currentSelected={currentSelectedRE}
        setCurrentSelected={setCurrentSelectedRE}
        tableTitle={texts.comments}
        handleGetReByType={dataCommByRe}
        propSelectData="title"
      />
    </div>
  );
};
