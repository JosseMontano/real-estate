import { z } from "zod";
import { questionSchema } from "../validations/question";
import { favsRESchema } from "../validations/favRE.shema";

export type QuestionDTO = z.infer<typeof questionSchema>;
export type FavREDTO = z.infer<typeof favsRESchema>;