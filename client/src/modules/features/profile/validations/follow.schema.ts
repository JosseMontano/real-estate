import { z } from "zod";
import { useLanguageStore } from "@/core/store/language";
import { useMemo } from "react";

export const followSchema= ()=> {
    return z.object({
    user_id: z.number().optional().optional().or(z.literal('')),
    user_followed_id: z.number().optional().optional().or(z.literal('')),
})}

export const useFollowSchema = () => {
    const { texts } = useLanguageStore();

    const userSchema = useMemo(() => {
        return followSchema()
    }, [texts]);

    return userSchema;
};
