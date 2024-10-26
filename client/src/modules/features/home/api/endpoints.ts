import { Question } from "./response";
import {QuestionDTO} from "./dtos"
import {
  db,
  addDoc,
  collection,
  getDocs,
} from "@/core/libs/firebase";
import { RealEstate } from "@/shared/types/realEstate";

export async function addQuestionToDB(
  userData: QuestionDTO
) {
  const question: Question = {
    question: userData.question,
  };

  await addDoc(collection(db, "questions"), question);
}

export const fetchRealEstates = async (): Promise<RealEstate[]> => {
  const querySnapshot = await getDocs(collection(db, "realEstates"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RealEstate[];
};