import { getDocs } from "firebase/firestore";
import { RealEstate, TypeRE } from "../../../shared/types/realEstate";
import { RealEstateDTO, ResponseDTO } from "./dtos"
import {
  db,
  collection,
  doc,
  updateDoc,
  query,
  where
} from "@/core/libs/firebase";
import { User } from "@/core/types/user";
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