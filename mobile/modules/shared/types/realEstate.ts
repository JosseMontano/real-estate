

import { LanguageDB } from "../../core/hooks/useGet";
import { User } from "../../core/store/user";


export type Zone = {
  id: number;
  name: string;
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
  type_real_estate:{
    activate:boolean,
    id:number,
    name_id:number
  }
  userId: number
  photos: PhotoRes[]
  zone: Zone
  active?:boolean
  user:User
  similarity_score?:number
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
