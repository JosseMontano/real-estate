import { z } from "zod";
import { Translations, useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";

export const questionSchema = (texts: Translations)=>{
  return z.object({
    question: z.string().min(3, texts.fieldRequired),
  });
}


export const useQuestionSchema = () => {
  const { texts } = useLanguageStore();

  const schema = useMemo(() => {
    return questionSchema(texts)
  }, [texts]);

  return schema;
};
