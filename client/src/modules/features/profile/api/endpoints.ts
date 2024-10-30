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
  const imgs = [
    "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2FsecondImage.jpg?alt=media&token=d16a97e2-6993-4dff-a883-04af9220f2c1",
    "https://firebasestorage.googleapis.com/v0/b/new-realestate-f4127.appspot.com/o/realEstates%2FfirstImage.jpg?alt=media&token=716b5bf1-65db-4449-b640-cb6a0d6f0055",
  ];

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
    images: imgs,
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