
import {FavREDTO, QuestionDTO} from "./dtos"

import { Res } from "@/core/types/res";
import { handleGet, handlePost } from "@/core/utils/fetch";
import { Zone } from "../types/zones";
import { OptionsType } from "../home";
import { RealEstate } from "@/shared/types/realEstate";
import { Favorites } from "../types/favorites";


export async function addQuestionToDB(
  userData: QuestionDTO
) {
  return handlePost('questions', userData)
}

export async function addFavRE(data: FavREDTO) {
  return handlePost<Favorites>('favorite_real_estates', data)
  
}

export async function filterRE(data: OptionsType[]) {
  return handlePost<RealEstate[]>(`real_estates/filter-real-estates`, data)
}

export const fetchSmartRE = async (id:number): Promise<Res<RealEstate[]>> => {
  return await handleGet<RealEstate[]>("real_estates/all_re/"+id);
  }


export const fetchZones = async (): Promise<Res<Zone[]>> => {
  return await handleGet<Zone[]>("real_estates/zones");
  }