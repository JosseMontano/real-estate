import { Res } from "../../../core/hooks/useGet"
import { handleGet } from "../../../core/helpers/fetch"
import { RealEstate } from "../../../shared/types/realEstate"


export const fetchRealEstates = async (): Promise<Res<RealEstate[]>> => {
    return await handleGet<RealEstate[]>('real_estates')
}