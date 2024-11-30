import { LanguageDB } from "@/shared/types/language";

export type Res<T>={
    status:number;
    message:LanguageDB;
    val:T;
}