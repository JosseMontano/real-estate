import { LanguageDB } from "@/shared/types/language"

export interface Report {
    id: number
    user_reported_email: string
    user_reported_cellphone: string
    reporter_email: string
    reporter_cellphone: string
    reason: LanguageDB
  }
  
