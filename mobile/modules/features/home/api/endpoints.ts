import { Res } from "../../../core/hooks/useGet"
import { handleGet } from "../../../core/helpers/fetch"
import { RealEstate, TypeRE } from "../../../shared/types/realEstate"


export const fetchRealEstates = async (userId:number): Promise<Res<RealEstate[]>> => {
    return await handleGet<RealEstate[]>('real_estates/all_re/'+userId)
}

export const fetchTypesRE = async (): Promise<Res<TypeRE[]>> => {
    return await handleGet<TypeRE[]>('type-real-estates')
}