import { z } from "zod";

import { Translations, useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";


export const forgotPassSchema = (texts: Translations)=>{
  return z
  .object({
    email_receiver: z.string().email(texts.invalidEmailAuth),
  })

}

export const useForgotPassSchema = () => {
  const { texts} = useLanguageStore();
  const userSchema = useMemo(() => {
    return forgotPassSchema(texts)
  }, [texts]); 

  return userSchema;
};
