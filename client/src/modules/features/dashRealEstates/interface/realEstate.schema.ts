import { z } from "zod";

export const realEstateSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title must be 100 characters or less" }),
    description: z.string().min(1, { message: "Description is required" }).max(500, { message: "Description must be 500 characters or less" }),
    amountBedroom: z
        .string().transform(val => parseInt(val))
        .refine((val) => !isNaN(val) && val >= 0, { message: "Bedrooms must be a non-negative integer" }),
    price: z
        .string()
        .transform((val) => parseFloat(val))
        .refine((val) => !isNaN(val) && val > 0, { message: "Price must be a positive number" }),
    amountBathroom: z
        .string()
        .transform(val => parseInt(val))
        .refine((val) => !isNaN(val) && val >= 0, { message: "Bathrooms must be a non-negative integer" }),
    squareMeter: z
        .string()
        .transform(v => parseFloat(v))
        .refine((val) => !isNaN(val) && val > 0, { message: "Square meter must be a positive number" }),
    latLong: z.string().optional().or(z.literal('')),
    typeRealEstateId: z.number().optional(),
    userId: z.number().optional().optional(),
    images: z.array(z.string()).optional().or(z.array(z.string()).length(0)),
});