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
import { Commentator, Comments, CommentT } from "@/core/types/commets";

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

interface MinimalCommentData {
  comment: CommentT;              
  commentator: Commentator;        
  user: User
  userId: string
}

export const addCommentToDB = async (data: MinimalCommentData): Promise<void> => {
  try {
    const commentsCollection = collection(db, 'comments');
    const newComment: Comments = {
      amountStars: 1,
      comment: { en: "", es: data.comment.es, pt: "" },
      commentator: data.commentator,
      realEstate: {
        address: "",
        amountBathroom: 0,
        amountBedroom: 0,
        available: false,
        description: { en: "", es: "", pt: "" },
        id: "",
        images: [],
        latLong: "",
        price: 0,
        squareMeter: 0,
        title: { en: "", es: "", pt: "" },
        typeRE: { id: "", value: "" },
        typeREId: "",
        user: {
          available: data.user.available,
          id: data.user.id ?? "",
          cellphoneNumber: data.user.cellphoneNumber,
          email: data.user.email,
          role: data.user.role,
          userId: data.userId,
          userName: data.user.userName
        },
        userId: data.userId
      },
      realEstateId: "",
    };
    await addDoc(commentsCollection, newComment);

    console.log('Comentario añadido correctamente');
  } catch (error) {
    console.error('Error al añadir el comentario:', error);
  }
};
