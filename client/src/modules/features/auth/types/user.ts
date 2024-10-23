import { z } from "zod";
import { userSchema } from "../validations/signUp";

export type User = {
    id?: string;
    userName: string;
    cellphoneNumber: string;
    email: string;
    qualification: number;
    codeRecuperation: string;
    role: number; // 1: admin, 2: user
    available: boolean;
  };
  
export type UserFormData = z.infer<typeof userSchema>;
  
  