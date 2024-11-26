import { getDocs } from "firebase/firestore";
import { RealEstate, TypeRE } from "../../../shared/types/realEstate";
import { RealEstateDTO, ResponseDTO } from "./dtos"
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
import { Commentator, CommentT } from "@/core/types/commets";
import { handleGet, handlePost } from "@/core/utils/fetch";
import { Res } from "@/core/types/res";
import { Question } from "@/shared/types/questions";


export async function addREToDB(
  realEstatData: RealEstateDTO,
) {
  return await handlePost("real_estates", realEstatData);
}


export async function fetchTypesRE(): Promise<Res<TypeRE[]>> {
  return handleGet<TypeRE[]>("type-real-estates");
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

export const fetchCommentsForUser = async (id: number): Promise<Res<Comment[]>> => {
  return await handleGet<Comment[]>('comments/top-comments-by-user/' + id);
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
          available: data?.user?.available,
          id: data.user.id ?? "",
          cellphoneNumber: data.user.cellphoneNumber ?? "",
          email: data.user.email,
          role: data.user.role,
          userId: data.userId,
          userName: data.user.userName ?? ""
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


export async function updateUserInDB() {
  const docRef = doc(db, "users", "UBdwtIm1iyoM1klyNZDV");
  //update user

  const user: User = {
    email: "eljosema501@gmail.com",
    available: true,
    cellphoneNumber: "123456789",
    codeRecuperation: "123456",
    qualification: "5",
    role: 1,
    userName: "jhack1",
  };
  try {
    await updateDoc(docRef, user);

    // Update the related comments
    const collectionRefComments = collection(db, "comments");
    const qComments = query(collectionRefComments, where("commentatorId", "==", "UBdwtIm1iyoM1klyNZDV"));
    const querySnapshotComments = await getDocs(qComments);

    // Update each comment asynchronously
    await Promise.all(
      querySnapshotComments.docs.map((commentDoc) =>
        updateDoc(commentDoc.ref, {
          "commentator.email": user.email,
          "commentator.userName": user.userName,
          "commentator.qualification": user.qualification,

        })
      )
    );
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

export const fetchRealEstatesByUserId = async (): Promise<Res<RealEstate[]>> => {
  return await handleGet<RealEstate[]>("real_estates");
}
 
export const fetchUnasweredQuestions = async (id:Number): Promise<Res<Question[]>> => {
  return await handleGet<Question[]>("questions/unanswered/"+id);
}


export const postResponse = async (name: ResponseDTO) => {
  return handlePost('responses', name)
}