import { useState } from "react";
import useGet from "../../../core/hooks/useGet";
import { handleGet } from "../../../core/helpers/fetch";
import { TypeRE } from "../../../shared/types/realEstate";


export const useTypeRe = () => {
    const [currentType, setCurrentType] = useState("")
      const { data: typeRE } = useGet({
        services: () => handleGet<TypeRE[]>('type-real-estates'),
        queryKey: ["types-real-estates"],
        itemsPerPage: 100,
      });

    return {
        currentType, setCurrentType, typeRE
    }
}