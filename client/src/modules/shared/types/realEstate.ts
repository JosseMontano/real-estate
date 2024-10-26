import { User } from "@/core/types/user";

  export interface RealEstate {
    id?: string;
    title: string;
    description: string;
    available: boolean;
    amountBedroom: number;
    price: number;
    amountBathroom: number;
    squareMeter: number;
    latLong: string;
    address: string;
    userId: string;
    user: User;
  }