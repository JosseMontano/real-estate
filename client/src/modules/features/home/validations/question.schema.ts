import { z } from "zod";

export const questionSchema = z.object({
  questionEs: z.string().min(3, "Debe tener al menos 3 caracteres"),
  questionEn:z.string().optional().or(z.literal('')),
  questionPt:z.string().optional().or(z.literal('')),
})