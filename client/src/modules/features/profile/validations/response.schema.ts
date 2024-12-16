import { z } from "zod";
import { useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";

export const responseSchema= (required?:string)=> {
    return z.object({
    response_text: z.string().min(1, required).max(500, "La respuesta no puede contener mas 500 caracteres"),
    question_id: z.number().optional().optional().or(z.literal('')),
    real_estate_id: z.number().optional().optional().or(z.literal('')),
})}

export const useResponseSchema = () => {
    const { texts } = useLanguageStore();

    const userSchema = useMemo(() => {
        return responseSchema(texts.fieldRequired)
    }, [texts]);

    return userSchema;
};
