import { z } from "zod";

export const realEstateSchema = z.object({
  titleEs: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title must be 100 characters or less" }),
  titleEn: z.string().optional().or(z.literal('')),
  titlePt: z.string().optional().or(z.literal('')),
  descriptionEs: z.string().min(1, { message: "Description is required" }).max(500, { message: "Description must be 500 characters or less" }),
  descriptionEn: z.string().optional().or(z.literal('')),
  descriptionPt: z.string().optional().or(z.literal('')),
  amountBedroom: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, { message: "Bedrooms must be a non-negative integer" }),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, { message: "Price must be a positive number" }),
  amountBathroom: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, { message: "Bathrooms must be a non-negative integer" }),
  squareMeter: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, { message: "Square meter must be a positive number" }),
  latLong: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),});