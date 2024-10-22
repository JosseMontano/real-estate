import { z } from "zod";

export const userSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters").max(32, "Username must be at most 32 characters"),
  cellphoneNumber: z.string().nonempty("Cellphone number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"), // Or whatever password policy you want
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"], // specify the field to show error
  message: "Passwords don't match",
});
