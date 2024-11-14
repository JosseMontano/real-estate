import { User } from "@/core/types/user";
import { LanguageDB } from "@/shared/types/language";
import { RealEstate } from "@/shared/types/realEstate";

export type Question = {
  active: boolean
  id: number
  question_id: number
  question: LanguageDB;
};

export type Comment = {
  id?: string;
  comment: LanguageDB;
  realEstate: RealEstate
  commentator: User
  amountStars: number
  realEstateId: string
  commentatorId: string
}

