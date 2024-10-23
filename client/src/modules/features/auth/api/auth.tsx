import { User, UserFormData } from "../types/user";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "@/core/libs/firebase";

export async function addUserToDB(
  userId: string,
  userData: UserFormData
) {
  const user: User = {
    userName: "",
    cellphoneNumber: "",
    email: userData.email,
    role: 2,
    available: true,
    qualification: 0,
    codeRecuperation: "",
  };

  await setDoc(doc(db, "users", userId), user);
}

export async function signUpFirebase(
  email: string,
  password: string,
  userData: UserFormData
) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await addUserToDB(user.uid, userData);
  return user;
}
