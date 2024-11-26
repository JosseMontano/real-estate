import { z } from "zod";
import { questionSchema } from "../validations/question.schema";

export type QuestionDTO = z.infer<typeof questionSchema>;