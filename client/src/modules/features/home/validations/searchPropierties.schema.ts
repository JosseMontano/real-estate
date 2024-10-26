import {z} from "zod"

export const searchProprSchema = z.object({
    priceLimit:z.string().min(1, "Debes seleccionar al menos un precio"),
})