import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Por favor, confirme su contraseña"),
  code: z
  .string()
  .optional()
  .transform((val) => (val ? Number(val) : undefined)),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contraseñas no coinciden",
});

