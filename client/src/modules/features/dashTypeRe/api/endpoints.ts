
import { Res } from "@/core/types/res";
import { Statistic } from "@/core/types/statistic";
import { Delete, handleGet, handlePost } from "@/core/utils/fetch";
import { TypeRe } from "@/shared/types/typeRe";

export const fetchTypeRe = async (): Promise<Res<TypeRe[]>> => {
    return await handleGet<TypeRe[]>('type-real-estates/with_filter')
}
export const getStadisticsTypeRe = async (): Promise<Res<Statistic>> => {
    return await handleGet<Statistic>('type-real-estates/statistics')
}
export const postTypeRe = async (name: {}) => {
    return handlePost('type-real-estates', name)
}
export const deleteTypeRe = async (id: number) => {
    return await Delete('type-real-estates', id)
}