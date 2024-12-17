import { z } from "zod";
import { useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";

export const reportSchema = (required: string) => {
  return z.object({
    user_reported_id: z.number().optional().optional().or(z.literal("")),
    reporter_id: z.number().optional().optional().or(z.literal("")),
    reason: z.string().min(3, required),
  });
};

export const useReportSchema = () => {
  const { texts } = useLanguageStore();

  const userSchema = useMemo(() => {
    return reportSchema(texts.fieldRequired);
  }, [texts]);

  return userSchema;
};
