import { z } from "zod";

export const typeReSchema = z.object({
    name: z.string().min(1, "Este campo no puede estar vacio")
})