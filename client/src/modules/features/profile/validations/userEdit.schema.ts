import { z } from "zod";

export const userEditSchema = z.object({
    username: z.string().optional(),
    cellphone: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined)),
    email: z.string().email("El correo electrónico no es válido"),
    photo: z.string().optional(),
});