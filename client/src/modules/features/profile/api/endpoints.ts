import {  getDocs } from "firebase/firestore";
import { RealEstate } from "../../../shared/types/realEstate";
import { RealEstateDTO } from "./dtos"
import {
  db,
  addDoc,
  collection,
} from "@/core/libs/firebase";
import { User } from "@/core/types/user";
import { doc, updateDoc } from "firebase/firestore";

export async function addREToDB(
  realEstatData: RealEstateDTO,
  user: User
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

export const fetchUser = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as User[]
}

export const editUser = async (userId: string, updatedData: Partial<User>): Promise<void> => {
  // Referencia al documento del usuario en Firestore
  const userRef = doc(db, "users", userId);
  

  try {
    // Actualiza el documento con los nuevos datos
    await updateDoc(userRef, updatedData);
    console.log("Usuario actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error; // Propaga el error si necesitas manejarlo en otro lugar
  }
};
