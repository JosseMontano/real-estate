import z from "zod"

export const commentSchema = z.object({
    comment_text: z.string().min(1, "El campo no puede estar vacio").max(500, "El comentario no puede contener mas 500 caracteres"),
    amount_star: z.number().optional().optional().or(z.literal('')),
    real_estate_id: z.number().optional().optional().or(z.literal('')),
    commentator_id: z.number().optional().optional().or(z.literal('')),

})