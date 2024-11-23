import { Res } from "@/core/types/res";
import { Statistic } from "@/core/types/statistic";
import { Delete, handleGet } from "@/core/utils/fetch";
import { Response } from "@/shared/types/questions";

export const fetchReponses = async (): Promise<Res<Response[]>> => {
    return await handleGet<Response[]>('responses')
}

export const getStatiticsResponses = async (): Promise<Res<Statistic>> => {
    return await handleGet<Statistic>('responses/statistics')
}
export const getResponsesByQuestion = async (id:number):Promise<Res<Response[]>>=>{
    return await handleGet<Response[]>(`responses/${id}`)
}
export const deleteReponse = async (id: number) => {
    return await Delete('responses', id)
}