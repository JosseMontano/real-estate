import { z } from "zod";
import { useUserShema } from "../auth";


export type loginDTO = z.infer<typeof useUserShema>;
  
  