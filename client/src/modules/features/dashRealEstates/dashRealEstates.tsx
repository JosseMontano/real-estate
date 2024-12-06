import useGet from "@/core/hooks/useGet";
import {
  deleteRealEstates,
  getREByType,
  getStadisticsRealEstates,
} from "./api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import { SumaryCard } from "../dashboard/components/sumaryCards";
import { CustomerTable } from "../dashboard/components/customerTable";
import { fetchTypesRE } from "../profile/api/endpoints";
import { useEffect, useState } from "react";
import { RealEstate, TypeRE } from "@/shared/types/realEstate";
import { useLanguageStore } from "@/core/store/language";
import { fetchRealEstates } from "@/shared/api/endpoints";


export const DashRealEstates = () => {
  const {
    data: RealEstate,
    fullData,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: fetchRealEstates,
    queryKey: ["RealEstate"],
    itemsPerPage: 5,
  });

  console.log(fullData);

  const { data: statistics, isLoading: isLoadingStatistics } = useGet({
    services: getStadisticsRealEstates,
    queryKey: ["RealEstate", RealEstate],
  });

  const header = [
    "title",
    "amount_bathroom",
    "amount_bedroom",
    "square_meter",
    "price",
    "active",
  ];

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteRealEstates,
    onSuccess: async (data) => {
      setFilteredRealEstate((prevFiltered) =>
        prevFiltered
          .map((item) =>
            item.id === data.val.id ? { ...item, active: !item.active } : item
          )
          .filter((item) => prevFiltered.some((prev) => prev.id === item.id))
      );

      // Invalida la query global para sincronizar
      queryClient.invalidateQueries({ queryKey: ["RealEstate"] });
    },
  });

  const { data: TypeRE } = useGet({
    itemsPerPage: 10,
    queryKey: ["type-realEstates"],
    services: fetchTypesRE,
  });

  const [typeRE, setTypeRE] = useState({} as TypeRE);

  const { texts } = useLanguageStore();
  const [filteredRealEstate, setFilteredRealEstate] = useState<RealEstate[]>(
    []
  );

  const { mutate: dataReByType } = useMutation({
    mutationFn: getREByType,
    onSuccess: (data) => {
      setFilteredRealEstate(data.val);
    },
  });

  useEffect(() => {
    setFilteredRealEstate(filteredRealEstate);
  }, [setFilteredRealEstate]);
  
  return (
    <div>
      <SumaryCard
        amountActive={statistics?.active}
        amountInactive={statistics?.inactive}
        amountTotal={statistics?.total}
        isloading={isLoadingStatistics}
      />
      <CustomerTable
      fullData={fullData
      }
        amountOfPages={amountOfPages}
        currentPage={currentPage}
        data={
          Object.keys(typeRE).length === 0 ? RealEstate : filteredRealEstate
        }
        handlePagination={handlePagination}
        handleState={mutateToState}
        header={header}
        isloading={isLoading}
        selectData={TypeRE}
        currentSelected={typeRE}
        setCurrentSelected={setTypeRE}
        tableTitle={texts.tableTile}
        handleGetReByType={dataReByType}
        propSelectData="name"
      />
    </div>
  );
};
