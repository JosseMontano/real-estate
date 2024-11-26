import { z } from "zod";
import { realEstateSchema } from "../validations/realEstates.schema";
import { responseSchema } from "../validations/response.schema";

export type RealEstateDTO = z.infer<typeof realEstateSchema>;
export type ResponseDTO = z.infer<typeof responseSchema>;