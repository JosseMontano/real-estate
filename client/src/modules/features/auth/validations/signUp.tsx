import { z } from "zod";
import { useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";

export const useUserSchema = () => {
  const { texts } = useLanguageStore();

  const userSchema = useMemo(() => {
    return z
      .object({
        email: z.string().email(texts.invalidEmailAuth),
        password: z.string().min(6, texts.invalidPasswordAuth),
        confirmPassword: z.string().min(6, texts.invalidConfirmPasswordAuth),
        code: z
          .string()
          .optional()
          .transform((val) => (val ? Number(val) : undefined)),
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: texts.invalidMatchPasswordAuth,
      });
  }, [texts]); 

  return userSchema;
};
