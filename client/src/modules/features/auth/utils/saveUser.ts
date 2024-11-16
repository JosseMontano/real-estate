import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { UserDTO } from "../api/dtos";
import { addUserToDB, findUser } from "../api/endpoints";
import { User } from "@/core/types/user";
import { handlePost } from "@/core/utils/fetch";

const createUserObject = (
    doc: DocumentSnapshot<DocumentData, DocumentData>
  ) => ({
    id: doc.id,
    email: doc.data()?.email,
    userName: doc.data()?.userName,
    cellphoneNumber: doc.data()?.cellphoneNumber,
    qualification: doc.data()?.qualification,
    codeRecuperation: doc.data()?.codeRecuperation,
    role: doc.data()?.role,
    available: doc.data()?.available,
  });
  

export const saveUser =async(user:UserDTO)=>{
  return await handlePost<UserDTO>('auth/signup',user)
  
}