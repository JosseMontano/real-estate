import { User } from "@/core/types/user";
import { LanguageDB } from "@/shared/types/language";
import { RealEstate } from "@/shared/types/realEstate";

export type Question = {
    id?: string;
    question: LanguageDB;
  };
  
export type Comment={
    id?: string;
    comment: LanguageDB;
    realEstate:RealEstate
    commentator: User
    amountStars:number
}
  
  