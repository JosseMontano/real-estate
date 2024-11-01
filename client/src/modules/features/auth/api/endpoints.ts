import { User } from "@/core/types/user";
import { UserDTO } from "./dtos";

import {
  addDoc,
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  getDoc,
  getDocs,
  query,
  where,
} from "@/core/libs/firebase";


export async function findUser(email: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  return await getDocs(q);
  
}

export async function addUserToDB(userData: UserDTO) {
  const user:User = {
    email: userData.email,
    role: 2,
    available: true,
    cellphoneNumber: "",
    userName:"",
    codeRecuperation:"",
    qualification:0,
  }
  //const res= await setDoc(doc(db, "users", userId), user);
  const res = await addDoc(collection(db, "users"), user);
  const doc = await getDoc(res);
  return doc;
}

export async function signUpFirebase(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
}
