import { handleGet } from "@/core/utils/fetch"
import { RealEstate } from "../types/realEstate"
import { Res } from "@/core/types/res"

export const fetchRealEstates = async (): Promise<Res<RealEstate[]>> => {
    return await handleGet<RealEstate[]>('real_estates')
}