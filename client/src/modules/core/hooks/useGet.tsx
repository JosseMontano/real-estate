import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Res } from "../types/res";

type Props<T> = {
  services: () => Promise<Res<T>>;
  queryKey: any[];
  itemsPerPage?: number;
};

const defaultItemsPerPage = 100;

const useGet = <T,>({
  services,
  queryKey,
  itemsPerPage = defaultItemsPerPage,
}: Props<T>) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const res = await services();
      return res.val;
    },
  });

  const [startPagination, setStartPagination] = useState(0);
  const [endPagination, setEndPagination] = useState(itemsPerPage);
  const firstElementRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePagination = (page: number) => {
    setStartPagination((page - 1) * itemsPerPage);
    setEndPagination(page * itemsPerPage);
    if (firstElementRef.current) {
      setCurrentPage(page);
      firstElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const amountOfPages = Math.ceil(
    data && Array.isArray(data) ? data.length / itemsPerPage : 1
  );

  const dataPaginated: T = Array.isArray(data)
    ? (data.slice(startPagination, endPagination) as unknown as T)
    : ([] as unknown as T);

  return {
    isLoading,
    data: itemsPerPage != defaultItemsPerPage ? dataPaginated : (data as T),
    isError,
    error,
    handlePagination,
    amountOfPages,
    startPagination,
    endPagination,
    firstElementRef,
    currentPage,
  };
};

export default useGet;
