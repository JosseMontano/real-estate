import { getDocs } from "firebase/firestore";
import { RealEstate } from "../../../shared/types/realEstate";
import { RealEstateDTO } from "./dtos"
import {
  db,
  addDoc,
  collection,
  doc,
  updateDoc,
  query,
  where
} from "@/core/libs/firebase";
import { User } from "@/core/types/user";
import { Comments } from "@/core/types/commets";

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
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, updatedData);
  } catch (error) {
    throw error;
  }
};

export const fetchCommentsForUser = async (userId: string): Promise<Comments[]> => {
  const q = query(collection(db, "comments"), where("realEstate.userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Comments)
  }));
}
