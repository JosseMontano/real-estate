import { Comment, Question } from "./response";
import {CommentDTO, QuestionDTO} from "./dtos"
import {
  db,
  addDoc,
  collection,
  getDocs,
} from "@/core/libs/firebase";
import { RealEstate } from "@/shared/types/realEstate";
import { User } from "@/core/types/user";

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
    amountStars:5
  }
  await addDoc(collection(db,"comments"),comment)
}

export const fetchRealEstates = async (): Promise<RealEstate[]> => {
  const querySnapshot = await getDocs(collection(db, "realEstates"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RealEstate[];
};