
import {QuestionDTO} from "./dtos"

import { Res } from "@/core/types/res";
import { handleGet, handlePost } from "@/core/utils/fetch";
import { Zone } from "../types/zones";


export async function addQuestionToDB(
  userData: QuestionDTO
) {
  return handlePost('questions', userData)
}


export const fetchZones = async (): Promise<Res<Zone[]>> => {
  return await handleGet<Zone[]>("real_estates/zones");
  }