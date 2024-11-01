import { z } from "zod";

export const userEditSchema = z.object({
    userName: z.string().min(1, "El nombre de usuario es obligatorio"),
    cellphoneNumber: z.string().optional(),
    email: z.string().email("El correo electrónico no es válido"),
});