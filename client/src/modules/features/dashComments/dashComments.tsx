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
import { fetchRealEstates } from "../home/api/endpoints";
import { RealEstate } from "@/shared/types/realEstate";

type ParamsType = {};
export const DashComments = ({}: ParamsType) => {
  const {
    data: Comments,
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

      // Invalida la query global para sincronizar
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
  console.log(DataRealEstate);
  return (
    <div>
      <SumaryCard
        amountActive={statistics?.active}
        amountInactive={statistics?.inactive}
        amountTotal={statistics?.total}
        isloading={isLoadingStatistics}
      />
      <CustomerTable
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
        tableTitle="Comentarios"
        handleGetReByType={dataCommByRe}
      />
    </div>
  );
};
