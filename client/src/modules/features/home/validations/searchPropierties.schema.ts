import {z} from "zod"

export const searchProprSchema = z.object({
    id: z.number().optional(), 
    name: z.string().optional(), 
    type: z.enum(["type", "zone", "price"]), 
})


