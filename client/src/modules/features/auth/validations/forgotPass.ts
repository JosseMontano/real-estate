import { z } from "zod";

export const forgotPassSchema = z.object({
  email_receiver: z.string().min(3, "Debe tener al menos 3 caracteres"),
})