import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Res } from "../types/res";
import { Statistic } from "../types/statistic";
import { Delete, handleGet } from "../utils/fetch";
import useGet from "./useGet";
import { useEffect, useMemo, useState } from "react";

type ParamsType = {
  url: string;
  header: string[];
  selectUrl?: string;
  deleteService: (id: number) => Promise<any>;
  getDataBySelectedId?: (id: number) => Promise<any>;
};

const fetch = async <T,>(url: string): Promise<Res<T>> => {
  return await handleGet<T>(url);
};

export const useDash = <TableData, SelectData>({
  url,
  header,
  selectUrl="",
  deleteService,
  getDataBySelectedId,
}: ParamsType) => {
  const queryClient = useQueryClient();

  const {
    data: tableDate,
    fullData,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: () => fetch<TableData>(url),
    queryKey: [url],
    itemsPerPage: 10,
  });

  const statisticsQueryKey = useMemo(
    () => [url + "/statistics/general", tableDate],
    [url, tableDate]
  );

  const { data: statistics, isLoading: isLoadingStatistics } = useGet({
    services: () => fetch<Statistic>(`${url}/statistics/general`),
    queryKey: statisticsQueryKey,
  });

  const { data: selectData } = useGet({
    services: () => fetch<SelectData>(selectUrl),
    queryKey: [selectUrl],
  });

  const [selected, setSelected] = useState({} as SelectData);

  const [tableDateFiltered, setTableDateFiltered] = useState<TableData>(
    [] as TableData
  );

  const { mutate: mutateToState } = useMutation({
    mutationFn: deleteService,
    onSuccess: async (data) => {
      setTableDateFiltered((prevFiltered) =>
        prevFiltered
          //@ts-ignore
          .map((item) =>
            item.id === data.val.id ? { ...item, active: !item.active } : item
          )
          //@ts-ignore
          .filter((item) => prevFiltered.some((prev) => prev.id === item.id))
      );

      queryClient.invalidateQueries({ queryKey: [url] });
    },
  });

  const { mutate: dataBySelectedId } = useMutation({
    mutationFn: getDataBySelectedId,
    onSuccess: (data) => {
      setTableDateFiltered(data.val);
    },
  });

  return {
    tableDate,
    fullData,
    isLoading,
    amountOfPages,
    handlePagination,
    currentPage,
    statistics,
    isLoadingStatistics,
    header,
    selectData,
    selected,
    setSelected,
    tableDateFiltered,
    mutateToState,
    dataBySelectedId,
  };
};
