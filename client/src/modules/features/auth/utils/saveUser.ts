import { UserDTO } from "../api/dtos";
import { User } from "@/core/types/user";
import { handlePost } from "@/core/utils/fetch";



export const saveUser =async(user:UserDTO)=>{
  return await handlePost<User>('auth/signup',user)
}

export const changePassword =async(user:UserDTO)=>{
  return await handlePost<User>('auth/change_password',user)
}