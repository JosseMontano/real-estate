import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "../store/language";
/* import { toast } from 'sonner-native'; */
import { handleToast } from "../helpers/toast";

export type LanguageDB={
    es:string;
    en:string;
    pt:string;
}

export type Res<T>={
    status:number;
    message:LanguageDB;
    val:T;
}

type Props<T> = {
  services: (val?:number) => Promise<Res<T>>;
  queryKey: any[];
  itemsPerPage?: number;
  valueToService?: number;
};

const defaultItemsPerPage = 100;

const useGet = <T,>({
  services,
  queryKey,
  valueToService,
  itemsPerPage = defaultItemsPerPage,
}: Props<T>) => {
  const {language, texts}= useLanguageStore()
  const [msg, setMsg] = useState("");
  const [isFirstRun, setIsFirstRun] = useState(true);

  const { isLoading, data, isError, error,refetch, dataUpdatedAt  } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      if(valueToService){
      const res = await services(valueToService);
      setMsg(res.message[language]);
      return res.val;
      }
      const res = await services();
      setMsg(res.message[language]);
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
    setCurrentPage(page);
    if (firstElementRef.current) {
    
      firstElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const amountOfPages = Math.ceil(
    data && Array.isArray(data) ? data.length / itemsPerPage : 1
  );

  const dataPaginated: T = Array.isArray(data)
    ? (data.slice(startPagination, endPagination) as unknown as T)
    : ([] as unknown as T);

  useEffect(() => {
    if (msg !== "") {
      if (isFirstRun) {
        setIsFirstRun(false);
      } else {
        handleToast(msg, texts.sucess)
      }
    }
  }, [dataUpdatedAt]);

  return {
    isLoading,
    data: itemsPerPage != defaultItemsPerPage ? dataPaginated : (data as T),
    fullData: data as T,
    isError,
    error,
    handlePagination,
    amountOfPages,
    startPagination,
    endPagination,
    firstElementRef,
    currentPage,
    refetch 
  };
};

export default useGet;
