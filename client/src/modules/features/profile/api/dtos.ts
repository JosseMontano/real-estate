import { z } from "zod";
import { realEstateSchema } from "../validations/realEstates.schema";
import { responseSchema } from "../validations/response.schema";
import { commentSchema } from "../validations/comment.schema";
import { followSchema } from "../validations/follow.schema";
import { reportSchema } from "../validations/report.schema";


export type RealEstateDTO = z.infer<typeof realEstateSchema>;
export type ResponseDTO = z.infer<ReturnType<typeof responseSchema>>;
export type CommentDTO = z.infer<typeof commentSchema>;
export type FollowDTO =z.infer<ReturnType<typeof followSchema>>
export type ReportDTO= z.infer<ReturnType<typeof reportSchema>>
