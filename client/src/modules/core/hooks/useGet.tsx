import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

type Props<T> = {
  services: () => Promise<T>;
  queryKey: string;
  itemsPerPage: number;
};
const useGet = <T,>({ services, queryKey, itemsPerPage }: Props<T>) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await services();
      return res;
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
    data: dataPaginated,
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
