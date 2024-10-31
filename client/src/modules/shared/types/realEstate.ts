import { User } from "@/core/types/user";
import { LanguageDB } from "./language";

  export interface RealEstate {
    id?: string;
    title: LanguageDB;
    description: LanguageDB;
    available: boolean;
    amountBedroom: number;
    price: number;
    amountBathroom: number;
    squareMeter: number;
    latLong: string;
    address: string;
    userId: string;
    user: User;
    typeRE:TypeRE
    typeREId:string
    images:string[]
  }

  export interface TypeRE{
    id?: string;
    name: LanguageDB;
  }