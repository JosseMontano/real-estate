import {
  deleteReport,
  getReportsyUserId,
} from "./api/endpoints";
import { SumaryCard } from "../../core/components/dashboard/sumaryCards";
import { CustomerTable } from "../../core/components/dashboard/customerTable";
import { useLanguageStore } from "@/core/store/language";
import { useDash } from "@/core/hooks/useDash";
import { User } from "@/core/types/user";


export const DashReports = () => {
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
  } = useDash<Report[], User[]>({
    url: "report_users",
    header: [
      
      {
        key: "user_reported_email",
        val: texts.userReportsDash,
      },
      {
        key: "user_reported_cellphone",
        val: texts.userReportesCellphoneDash,
      },
      {
        key: "reporter_email",
        val: texts.reporterEmailDash,
      },
      {
        key: "reporter_cellphone",
        val: texts.reporterCellphoneDash,
      },
      {
        key: "active",
        val: texts.active,
      },
      
   ],
    selectUrl: "questions",
    deleteService: deleteReport,
    getDataBySelectedId: getReportsyUserId,
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
        tableTitle={texts.reports}
        handleGetReByType={dataBySelectedId}
        propSelectData="email"
      />
    </div>
  );
};
