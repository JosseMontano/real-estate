import { RealEstate } from "../../../shared/types/realEstate";
import {RealEstateDTO} from "./dtos"
import {
  db,
  addDoc,
  collection,
} from "@/core/libs/firebase";
import { User } from "@/core/types/user";

export async function addREToDB(
  realEstatData: RealEstateDTO,
  user:User
) {
   const realestate: RealEstate = {
    address: realEstatData.address,
    amountBathroom: realEstatData.amountBathroom,
    amountBedroom: realEstatData.amountBedroom,
    description: realEstatData.description,
    latLong: realEstatData.latLong,
    price: realEstatData.price,
    squareMeter: realEstatData.squareMeter,
    title: realEstatData.title,
    available: true,
    userId: user.id ?? "",
    user: user,
  };

  await addDoc(collection(db, "realEstates"), realestate); 

}
