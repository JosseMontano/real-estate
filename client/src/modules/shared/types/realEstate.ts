import { LanguageDB } from "./language";
import { Zone } from "@/features/home/types/zones";

export type RealEstateDTO = {
  amountBathroom: number//5
  amountBedroom: number//4
  description: string//2
  latLong?: string//7
  price: number//3
  squareMeter: number//6
  title: string//1
  typeRealEstateId?: number//
  userId?: number//
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
  zone: Zone
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
