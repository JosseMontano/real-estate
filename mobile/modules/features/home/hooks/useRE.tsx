import { useMemo } from "react";
import { handleGet } from "../../../core/helpers/fetch";
import useGet from "../../../core/hooks/useGet";
import { RealEstate } from "../../../shared/types/realEstate";

type ParamsType = {
    currentType: string
}
export const useRe = ({currentType}:ParamsType) => {

  const {
    data: realEstates,
    isLoading,
    firstElementRef,
    amountOfPages,
    handlePagination,
    currentPage,
  } = useGet({
    services: () => handleGet<RealEstate[]>('real_estates/all_re/' + 1),
    queryKey: ["realEstates"],
    itemsPerPage: 4,
    valueToService: 1,
  });

    const filteredRealEstates = useMemo(() => {
      if (currentType) {
        return realEstates?.filter(
          (realEstate) => realEstate.type_real_estate.id === parseInt(currentType)
        ) || [];
      } else {
        return realEstates || [];
      }
    }, [currentType, realEstates]);

    return {
        filteredRealEstates,
        amountOfPages,
        handlePagination,
        currentPage,
    }
}