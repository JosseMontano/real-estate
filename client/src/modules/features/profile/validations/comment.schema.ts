import z from "zod"

export const commentSchema = z.object({
    es: z.string().min(1, "El campo no puede estar vacio").max(500, "El comentario no puede contener mas 500 caracteres"),

})