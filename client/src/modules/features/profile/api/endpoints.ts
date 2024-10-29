import { RealEstate, TypeRE } from "../../../shared/types/realEstate";
import {RealEstateDTO} from "./dtos"
import {
  db,
  addDoc,
  collection,
  getDocs,
} from "@/core/libs/firebase";
import { User } from "@/core/types/user";

export async function addREToDB(
  realEstatData: RealEstateDTO,
  user:User
) {
   const realestate: RealEstate = {
    address: realEstatData.address ?? "",
    amountBathroom: realEstatData.amountBathroom,
    amountBedroom: realEstatData.amountBedroom,
    description: {
      es: realEstatData.descriptionEs,
      en: realEstatData.descriptionEn ?? "",
      pt: realEstatData.descriptionPt ?? "",
    },
    latLong: realEstatData.latLong ?? "",
    price: realEstatData.price,
    squareMeter: realEstatData.squareMeter,
    title: {
      es: realEstatData.titleEs,
      en: realEstatData.titleEn ?? "",
      pt: realEstatData.titlePt ?? "",
    },
    available: true,
    userId: user.id ?? "",
    user: user,
  };

  await addDoc(collection(db, "realEstates"), realestate); 

}

export async function fetchTypesRE():Promise<TypeRE[]> {
  const querySnapshot = await getDocs(collection(db,"type_real_estates"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TypeRE[];
}