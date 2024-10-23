import { Question } from "./response";
import {QuestionDTO} from "./dtos"
import {
  db,
  addDoc,
  collection,
} from "@/core/libs/firebase";

export async function addQuestionToDB(
  userData: QuestionDTO
) {
  const question: Question = {
    question: userData.question,
  };

  await addDoc(collection(db, "questions"), question);
}
