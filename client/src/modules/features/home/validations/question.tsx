import { z } from "zod";
import { useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";

export const useQuestionSchema = () => {
  const { texts } = useLanguageStore();

  const questionSchema = useMemo(() => {
    return z.object({
      question: z.string().min(3, texts.fieldRequired),
    });
  }, [texts]);

  return questionSchema;
};
