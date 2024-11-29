import useGet from "@/core/hooks/useGet";
import {
  deleteComment,
  fetchComments,
  getCommentsByRe,
  getStatisticsComments,
} from "./api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { Comment } from "@/shared/types/questions";
import { useState } from "react";
import { queryClient } from "../../../App";
import { SumaryCard } from "../dashboard/components/sumaryCards";
import { CustomerTable } from "../dashboard/components/customerTable";
import { RealEstate } from "@/shared/types/realEstate";
import { fetchRealEstates } from "@/shared/api/endpoints";
import { useLanguageStore } from "@/core/store/language";

type ParamsType = {};
export const DashComments = ({}: ParamsType) => {
  const {
    data: Comments,
    fullData,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchComments,
    queryKey: ["Comments"],
    itemsPerPage: 10,
  });

  const { data: statistics, isLoading: isLoadingStatistics } = useGet({
    services: getStatisticsComments,
    queryKey: ["Comments", Comments],
  });
  const header = ["comment", "amount_star", "active"];
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

      queryClient.invalidateQueries({ queryKey: ["Comments"] });
    },
  });
  const { data: DataRealEstate } = useGet({
    services: fetchRealEstates,
    queryKey: ["RealEstate"],
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
            ? Comments
            : filteredComments
        }
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        selectData={DataRealEstate}
        currentSelected={currentSelectedRE}
        setCurrentSelected={setCurrentSelectedRE}
        tableTitle={texts.comments}
        handleGetReByType={dataCommByRe}
        propSelectData="title"
      />
    </div>
  );
};
