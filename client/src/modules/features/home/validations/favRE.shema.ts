import { z } from "zod";

export const favsRESchema = z.object({
    real_estate_id: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined)),
    user_id: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined)),
    })