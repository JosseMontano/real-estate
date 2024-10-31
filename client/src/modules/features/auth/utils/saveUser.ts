import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { UserDTO } from "../api/dtos";
import { addUserToDB, findUser } from "../api/endpoints";
import { User } from "@/core/types/user";

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
    const queryFindUser = await findUser(user.email);
    let userObject = {} as User;
      if (queryFindUser.empty) {
        const doc = await addUserToDB({
          email: user.email,
          password: user.password,
          confirmPassword: user.confirmPassword,
        });
        if (doc.exists()) {
          userObject = createUserObject(doc);
        
        }
      } else {
        queryFindUser.forEach((doc) => {
        userObject = createUserObject(doc);
        });
      }
return userObject
}