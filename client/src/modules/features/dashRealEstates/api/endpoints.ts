import { Res } from "@/core/types/res"
import { Statistic } from "@/core/types/statistic"
import { Delete, handleGet, handlePost } from "@/core/utils/fetch"
import { RealEstate, RealEstateDTO } from "@/shared/types/realEstate"

export const getStadisticsRealEstates = async (): Promise<Res<Statistic>> => {
    return await handleGet<Statistic>('real_estates/statistics')
}
export const getREByType = async (id: number): Promise<Res<RealEstate[]>> => {
    return await handleGet<RealEstate[]>(`real_estates/${id}`)
}
export const postRealEstates = async (data: RealEstateDTO) => {
    return handlePost('real_estates', data)
}
export const deleteRealEstates = async (id: number) => {
    return await Delete('real_estates', id)
}