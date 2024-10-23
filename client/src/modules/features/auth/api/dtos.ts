import { z } from "zod";
import { userSchema } from "../validations/signUp";

export type UserDTO = z.infer<typeof userSchema>;
  
  