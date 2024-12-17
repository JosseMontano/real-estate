import { User } from "@/core/types/user"
import { LanguageDB } from "@/shared/types/language"

export interface Report{
    id: number
    user_reported_id: number
    reporter_id: number
    reason_id: number
    reason: LanguageDB
    user_reported: User
    reporter: User
}
