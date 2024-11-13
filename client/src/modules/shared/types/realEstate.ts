import { Language, TranslateRes } from "@/core/store/language";
import { LanguageDB } from "./language";

  export interface RealEstate {
    amount_bathroom:     number;
    square_meter:        number;
    description_id:      number;
    type_real_estate_id: number;
    amount_bedroom:      number;
    available:           boolean;
    image:               string;
    address:             string;
    lat_long:            string;
    title_id:            number;
    id:                  number;
    price:               number;
    title:               TranslateRes;
    description:         TranslateRes;
    photos:              PhotoRes[];
  }

  export interface TypeRE{
    id?: string;
    name: LanguageDB;
  }

  export interface PhotoRes {
    id:             number;
    real_estate_id: number;
    image:          string;
}
