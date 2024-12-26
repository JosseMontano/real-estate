import { z } from "zod";
import { signUpSchema } from "../validations/signUp";
import { forgotPassSchema } from "../validations/forgotPass";

export type UserDTO = z.infer<ReturnType<typeof signUpSchema>>;
export type ForgotPassDTO = z.infer<ReturnType<typeof forgotPassSchema>>;
  
  