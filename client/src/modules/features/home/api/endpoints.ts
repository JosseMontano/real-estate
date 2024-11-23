import { Comment, Question } from "../../../shared/types/questions";
import {CommentDTO, QuestionDTO} from "./dtos"
import {
  db,
  addDoc,
  collection,
} from "@/core/libs/firebase";
import { RealEstate } from "@/shared/types/realEstate";
import { User } from "@/core/types/user";
import { Res } from "@/core/types/res";
import { handleGet, handlePost } from "@/core/utils/fetch";
import { Zone } from "../types/zones";


export async function addQuestionToDB(
  userData: QuestionDTO
) {
  return handlePost('questions', userData)
}

export async function addCommentToDB(commentData:CommentDTO, realEstate:RealEstate, user:User) {
  const comment:Comment={
    comment:{
      es:commentData.commentatorEs,
      en:commentData.commentatorEn ?? "",
      pt:commentData.commentaroPt ?? "",
    },
    realEstate:realEstate,
    commentator:user,
    amountStars:5,
    realEstateId:String(realEstate.id)?? "",
    commentatorId:user.id ?? "",
  }
  await addDoc(collection(db,"comments"),comment)
}

export const fetchRealEstates = async (): Promise<Res<RealEstate[]>> => {
  return await handleGet<RealEstate[]>("real_estates");
  }

  export const fetchZones = async (): Promise<Res<Zone[]>> => {
    return await handleGet<Zone[]>("real_estates/zones");
    }
  