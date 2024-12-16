
import { RealEstate, TypeRE } from "../../../shared/types/realEstate";
import { CommentDTO, FollowDTO, RealEstateDTO, ResponseDTO } from "./dtos"
import { Follow, User } from "@/core/types/user";
import { Delete, handleGet, handlePost, handlePut } from "@/core/utils/fetch";
import { Res } from "@/core/types/res";
import { Comment, Question } from "@/shared/types/questions";
import { FavRealEstate } from "../interface/favRE";
import { Response } from "../interface/response";


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


export const fetchRealEstatesByUserId = async (userId:number): Promise<Res<RealEstate[]>> => {
  return await handleGet<RealEstate[]>("real_estates/"+userId);
}
 
export const fetchUnasweredQuestions = async (id:number): Promise<Res<Question[]>> => {
  return await handleGet<Question[]>("questions/unanswered/"+id);
}

export const fetchGetAllResponsesByREId = async (id:number): Promise<Res<Response[]>> => {
  return await handleGet<Response[]>("responses/"+id);
}

export const postResponse = async (name: ResponseDTO) => {
  return handlePost('responses', name)
}

export const fetchGetFavsRE = async (id: number): Promise<Res<FavRealEstate[]>> => {
  return handleGet<FavRealEstate[]>(`favorite_real_estates/?user_id=${id}`);
}

export const fetchGetAverageComments = async (id?: number): Promise<Res<number[]>> => {
  return handleGet<number[]>(`comments/average-amount-start-by-user/`+id);
}

export const deleteFavRe = async (id: number) => {
  return await Delete('favorite_real_estates', id)
}

export const postComment = async (comment: CommentDTO) => {
  return handlePost('comments', comment)
}

export const postFollow = async (val: FollowDTO) => {
  return handlePost<Follow>('follows', val)
}

export async function fetchCommentsByRE(id:number): Promise<Res<Comment[]>> {
  return handleGet<Comment[]>("comments/"+id);
}

export async function fetchUserById(id:number): Promise<Res<User>>{
  return handleGet<User>("user/auth/"+id)
}