import { Language, TranslateRes } from "@/core/store/language";
import { LanguageDB } from "./language";

// export interface RealEstate {
//   amount_bathroom:     number;
//   square_meter:        number;
//   description_id:      number;
//   type_real_estate_id: number;
//   amount_bedroom:      number;
//   available:           boolean;
//   image:               string;
//   address:             string;
//   lat_long:            string;
//   title_id:            number;
//   id:                  number;
//   price:               number;
//   title:               TranslateRes;
//   description:         TranslateRes;
//   photos:              PhotoRes[];
// }
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
