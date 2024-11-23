import { z } from "zod";

export const questionSchema = z.object({
  question: z.string().min(3, "Debe tener al menos 3 caracteres"),
})