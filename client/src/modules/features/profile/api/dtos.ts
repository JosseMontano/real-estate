import { z } from "zod";
import { realEstateSchema } from "../validations/realEstates.schema";

export type RealEstateDTO = z.infer<typeof realEstateSchema>;