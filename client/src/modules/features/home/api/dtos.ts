import { z } from "zod";
import { questionSchema } from "../validations/question.schema";
import { commentSchema } from "../validations/comment.schema";

export type QuestionDTO = z.infer<typeof questionSchema>;
export type CommentDTO = z.infer<typeof commentSchema>;