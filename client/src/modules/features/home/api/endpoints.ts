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
import { handleGet } from "@/core/utils/fetch";


export async function addQuestionToDB(
  userData: QuestionDTO
) {
  const question: Question = {
    question: {
      es: userData.questionEs,
      en: userData.questionEn ?? "",
      pt: userData.questionPt ?? "",
    },
  };

  await addDoc(collection(db, "questions"), question);
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
    realEstateId:realEstate.id ?? "",
    commentatorId:user.id ?? "",
  }
  await addDoc(collection(db,"comments"),comment)
}

export const fetchRealEstates = async (): Promise<Res<RealEstate[]>> => {
  return await handleGet<RealEstate[]>("real_estates");
  }
