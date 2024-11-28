import { z } from "zod";
import { realEstateSchema } from "../validations/realEstates.schema";
import { responseSchema } from "../validations/response.schema";
import { commentSchema } from "../validations/comment.schema";

export type RealEstateDTO = z.infer<typeof realEstateSchema>;
export type ResponseDTO = z.infer<typeof responseSchema>;
export type CommentDTO = z.infer<typeof commentSchema>;