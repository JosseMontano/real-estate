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
  amount_star: number
  realEstateId: string
  commentatorId: string
  active: boolean
}

export type Response ={
  id?:number;
  realEstateId:number;
  response:LanguageDB;
  active:boolean;
  question:Question
  realEstate:RealEstate
  
}

