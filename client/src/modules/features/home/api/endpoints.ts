
import {FavREDTO, QuestionDTO} from "./dtos"

import { Res } from "@/core/types/res";
import { handleGet, handlePost } from "@/core/utils/fetch";
import { Zone } from "../types/zones";


export async function addQuestionToDB(
  userData: QuestionDTO
) {
  return handlePost('questions', userData)
}

export async function addFavRE(data: FavREDTO) {
  return handlePost('favorite_real_estates', data)
  
}


export const fetchZones = async (): Promise<Res<Zone[]>> => {
  return await handleGet<Zone[]>("real_estates/zones");
  }