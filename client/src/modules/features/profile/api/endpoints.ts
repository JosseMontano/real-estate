
import { RealEstate, TypeRE } from "../../../shared/types/realEstate";
import { CommentDTO, RealEstateDTO, ResponseDTO } from "./dtos"
import { User } from "@/core/types/user";
import { Delete, handleGet, handlePost, handlePut } from "@/core/utils/fetch";
import { Res } from "@/core/types/res";
import { Comment, Question } from "@/shared/types/questions";
import { FavRealEstate } from "../interface/favRE";


export async function addREToDB(
  realEstatData: RealEstateDTO,
) {
  return await handlePost("real_estates", realEstatData);
}


export async function fetchTypesRE(): Promise<Res<TypeRE[]>> {
  return handleGet<TypeRE[]>("type-real-estates");
}

export const editUser = async (email: string, updatedData: User)=> {
  return await handlePut(`auth/edit_profile/${email}`, updatedData);
};

export const fetchCommentsForUser = async (id: number): Promise<Res<Comment[]>> => {
  return await handleGet<Comment[]>('comments/top-comments-by-user/' + id);
}


export const fetchRealEstatesByUserId = async (): Promise<Res<RealEstate[]>> => {
  return await handleGet<RealEstate[]>("real_estates");
}
 
export const fetchUnasweredQuestions = async (id:Number): Promise<Res<Question[]>> => {
  return await handleGet<Question[]>("questions/unanswered/"+id);
}


export const postResponse = async (name: ResponseDTO) => {
  return handlePost('responses', name)
}

export const fetchGetFavsRE = async (id: number): Promise<Res<FavRealEstate[]>> => {
  return handleGet<FavRealEstate[]>(`favorite_real_estates/?user_id=${id}`);
}

export const deleteFavRe = async (id: number) => {
  return await Delete('favorite_real_estates', id)
}

export const postComment = async (comment: CommentDTO) => {
  return handlePost('comments', comment)
}

export async function fetchCommentsByRE(id:number): Promise<Res<Comment[]>> {
  return handleGet<Comment[]>("comments/"+id);
}