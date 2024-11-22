import useGet from "@/core/hooks/useGet";
import { useModal } from "@/core/hooks/useModal";
import {
  deleteRealEstates,
  fetchRealEstates,
  getStadisticsRealEstates,
} from "./api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import { SumaryCard } from "../dashboard/components/sumaryCards";
import { CustomerTable } from "../dashboard/components/customerTable";
import { fetchTypesRE } from "../profile/api/endpoints";
import { useState } from "react";
import { TypeRE } from "@/shared/types/realEstate";

type ParamsType = {};
export const DashRealEstates = ({}: ParamsType) => {
  const {
    data: RealEstate,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchRealEstates,
    queryKey: ["RealEstate"],
    itemsPerPage: 10,
  });

  const { data: statistics, isLoading: isLoadingStatistics } = useGet({
    services: getStadisticsRealEstates,
    queryKey: ["RealEstate", RealEstate],
  });


  const header = ["title", "active"];

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteRealEstates,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RealEstate"] });
    },
  });

  const { data:TypeRE } = useGet({
    itemsPerPage: 10,
    queryKey: ["type-realEstates"],
    services: fetchTypesRE,
  });

  const [typeRE, setTypeRE] = useState({} as TypeRE);

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
        data={RealEstate}
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        selectData={TypeRE}
        currentSelected={typeRE}
        setCurrentSelected={setTypeRE}
      />
    </div>
  );
};
