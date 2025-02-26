import { LanguageDB } from "../../core/hooks/useGet";
import { Question } from "../../features/realEstate/types/question";

export interface Response {
  id: number;
  question_id: number;
  real_estate_id: number;
  response_id: number;
  active: boolean;
  question: Question;
  response: LanguageDB;
}
