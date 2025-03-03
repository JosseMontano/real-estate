import { LanguageDB } from "../../core/hooks/useGet";
import { User } from "../../core/store/user";
import { RealEstate } from "./realEstate";

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
  