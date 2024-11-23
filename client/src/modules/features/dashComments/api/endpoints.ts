import { Res } from "@/core/types/res"
import { Statistic } from "@/core/types/statistic"
import { Delete, handleGet } from "@/core/utils/fetch"
import { Comment } from "@/shared/types/questions"

export const fetchComments = async (): Promise<Res<Comment[]>> => {
    return await handleGet<Comment[]>('comments')
}

export const getStatisticsComments = async (): Promise<Res<Statistic>> => {
    return await handleGet<Statistic>('comments/statistics')

}
export const getCommentsByRe = async (id:number):Promise<Res<Comment[]>>=>{
    return await handleGet<Comment[]>(`comments/${id}`)
}

export const deleteComment = async (id: number) => {
    return await Delete('comments', id)
}