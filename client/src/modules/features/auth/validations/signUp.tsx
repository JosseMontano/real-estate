import { z } from "zod";
import { Translations, useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";

export const signUpSchema = (texts: Translations)=>{
  return z
  .object({
    email: z.string().email(texts.invalidEmailAuth),
    password: z.string().min(6, texts.invalidPasswordAuth),
    code: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : undefined)),
  })

}

export const useUserSchema = () => {
  const { texts, language} = useLanguageStore();
  const userSchema = useMemo(() => {
    return signUpSchema(texts)
  }, [texts]); 

  return userSchema;
};

