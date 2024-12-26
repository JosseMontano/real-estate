import { deleteComment, getCommentsByRe } from "./api/endpoints";
import { Comment } from "@/shared/types/questions";
import { SumaryCard } from "../../core/components/dashboard/sumaryCards";
import { CustomerTable } from "../../core/components/dashboard/customerTable";
import { RealEstate } from "@/shared/types/realEstate";
import { useLanguageStore } from "@/core/store/language";
import { useDash } from "@/core/hooks/useDash";

export const DashComments = () => {
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
    selectData,
    selected,
    setSelected,
    tableDateFiltered,
    dataBySelectedId,
    mutateToState,
  } = useDash<Comment[], RealEstate[]>({
    url: "comments",
    header: [
      
      {
        key: "comment",
        val: texts.commentsDash,
      },
      {
        key: "amount_star",
        val: texts.starsDash,
      },
      {
        key: "active",
        val:texts.active,
      },],
    selectUrl: "real_estates",
    deleteService: deleteComment,
    getDataBySelectedId: getCommentsByRe,
  });



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
        tableTitle={texts.comments}
        handleGetReByType={dataBySelectedId}
        propSelectData="title"
      />
    </div>
  );
};
