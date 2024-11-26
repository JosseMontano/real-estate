
import {
  auth,
  createUserWithEmailAndPassword,
} from "@/core/libs/firebase";
import { ForgotPassDTO } from "./dtos";
import { handlePost } from "@/core/utils/fetch";


export async function forgotPass(
  data: ForgotPassDTO
) {
  return handlePost('auth/forgot_password', data)
}


export async function signUpFirebase(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
}
