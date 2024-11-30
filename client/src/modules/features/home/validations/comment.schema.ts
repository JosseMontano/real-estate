import { z } from "zod";

export const commentSchema = z.object({
  commentatorEs: z.string().min(3, "Debe tener al menos 3 caracteres"),
  commentatorEn:z.string().optional().or(z.literal('')),
  commentaroPt:z.string().optional().or(z.literal('')),
})