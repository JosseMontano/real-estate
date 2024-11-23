import { Language, TranslateRes } from "@/core/store/language";
import { LanguageDB } from "./language";

export type RealEstateDTO = {
  amountBathroom: number
  amountBedroom: number
  description: string
  latLong?: string
  price: number
  squareMeter: number
  title: string
  typeRealEstateId?: number
  userId?: number
  images?: string[]
}
export type RealEstate = {
  id?: number;
  amountBathroom: number
  amountBedroom: number
  description: LanguageDB
  latLong: string
  price: number
  squareMeter: number
  title: LanguageDB
  typeRealEstateId: number
  userId: number
  images: PhotoRes[]
  active?:boolean
}
export interface TypeRE {
  id: number;
  name: LanguageDB;
}

export type PhotoRes = {
  id: number;
  real_estate_id: number;
  image: string;
}
