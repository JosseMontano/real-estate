import { Res } from "@/core/types/res"
import { Delete, handleGet } from "@/core/utils/fetch"
import { RealEstate } from "@/shared/types/realEstate"

export const deleteReport = async (id: number) => {
    return await Delete('report_users/toggle-availability/', id)
}

export const getReportsyUserId = async (id: number): Promise<Res<RealEstate[]>> => {
    return await handleGet<RealEstate[]>(`report_users/filter/${id}`)
}