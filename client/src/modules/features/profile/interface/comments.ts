import { User } from "@/core/types/user"
import { LanguageDB } from "@/shared/types/language"
import { RealEstate } from "@/shared/types/realEstate"


export interface Comment {
    commentator_id: number
    real_estate_id: number
    active: boolean
    amount_star: number
    id: number
    comment_id: number
    comment: LanguageDB
    commentator: User
    real_estate: RealEstate
  }
  

