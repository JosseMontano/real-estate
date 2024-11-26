
import {
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  getDocs,
  query,
  where,
} from "@/core/libs/firebase";


export async function findUser(email: string) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  return await getDocs(q);
  
}


export async function signUpFirebase(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
}
