import { Res } from "@/core/types/res"
import { Delete, handleGet } from "@/core/utils/fetch"
import { Comment } from "@/shared/types/questions"

export const getCommentsByRe = async (id:number):Promise<Res<Comment[]>>=>{
    return await handleGet<Comment[]>(`comments/${id}`)
}

export const deleteComment = async (id: number) => {
    return await Delete('comments', id)
}