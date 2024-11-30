import { LanguageDB } from "@/shared/types/language"
import { Question } from "@/shared/types/questions"



export interface Response {
    id: number
    question_id: number
    real_estate_id: number
    response_id: number
    active: boolean
    question: Question
    response: LanguageDB
  }
  
  