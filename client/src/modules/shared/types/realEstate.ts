import { LanguageDB } from "./language";
import { Zone } from "@/features/home/types/zones";

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
  amount_bathroom: number
  amount_bedroom: number
  description: LanguageDB
  lat_long: string
  price: number
  squareMeter: number
  title: LanguageDB
  address: string
  typeRealEstateId: number
  userId: number
  photos: PhotoRes[]
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
