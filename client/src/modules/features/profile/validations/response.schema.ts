import z from "zod"

export const responseSchema = z.object({
    response_text: z.string().min(1, "El campo no puede estar vacio").max(500, "La respuesta no puede contener mas 500 caracteres"),
    question_id: z.number().optional().optional().or(z.literal('')),
    real_estate_id: z.number().optional().optional().or(z.literal('')),
})