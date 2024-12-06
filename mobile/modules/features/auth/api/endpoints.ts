import { handlePost } from "../../../core/helpers/fetch";
import { loginDTO } from "./dtos";

export async function forgotPass(
  data: loginDTO
) {
  return handlePost('auth/login', data)
}

