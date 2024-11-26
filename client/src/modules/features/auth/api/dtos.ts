import { z } from "zod";
import { userSchema } from "../validations/signUp";
import { forgotPassSchema } from "../validations/forgotPass";

export type UserDTO = z.infer<typeof userSchema>;
export type ForgotPassDTO = z.infer<typeof forgotPassSchema>;
  
  