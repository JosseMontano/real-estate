import { useQueryClient } from "@tanstack/react-query";
import { Res } from "../types/res";
import { Statistic } from "../types/statistic";
import { handleGet } from "../utils/fetch";
import useGet from "./useGet";
import { useEffect, useMemo } from "react";

type ParamsType = {
  url: string;
  header: string[];
  selectUrl: string;
};

const fetch = async <T,>(url: string): Promise<Res<T>> => {
  return await handleGet<T>(url);
};

export const useDash = <TableData, SelectData>({
  url,
  header,
  selectUrl,
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
    queryKey:statisticsQueryKey,
  });

  const { data: selectData } = useGet({
    services: () => fetch<SelectData>(selectUrl),
    queryKey: [selectUrl],
  });

  useEffect(() => {
    if (tableDate) {
      queryClient.invalidateQueries({
        queryKey: [`${url}/statistics/general`],
      });
    }
  }, [tableDate, queryClient, url]);

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
  };
};
