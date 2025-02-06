import { z } from "zod";
import { Translations, useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";

export const signUpSchema = (texts: Translations)=>{
  return z
  .object({
    email: z.string().email(texts.invalidEmailAuth),
    password: z.string().min(6, texts.invalidPasswordAuth),
    photo:z.string().optional(),
    code: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined)),
    is_google: z.boolean().optional(),
  })

}

export const useUserSchema = () => {
  const { texts} = useLanguageStore();
  const userSchema = useMemo(() => {
    return signUpSchema(texts)
  }, [texts]); 

  return userSchema;
};

