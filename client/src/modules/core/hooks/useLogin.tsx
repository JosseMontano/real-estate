import { UserDTO } from "@/features/auth/api/dtos";
import { useUserSchema } from "@/features/auth/validations/signUp";
import { useForm } from "./useForm";
import { User } from "../types/user";
import { LanguageDB } from "@/shared/types/language";
import useAuthStore from "../store/auth";
import useNavigation from "./useNavigate";
import { useLanguageStore } from "../store/language";
import { changePassword, saveUser } from "@/features/auth/utils/saveUser";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "@/core/libs/firebase";

type ParamsType = { code?: string; email?: string };

export const useLogin = ({ code, email }: ParamsType) => {
  const userSchema = useUserSchema();
  const { login } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const { language } = useLanguageStore();
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isSignUpPending,
    setSuccessMsg,
    setErrorMsg,
  } = useForm({
    schema: userSchema,
    form: async (userData) => {
      let userObject = {} as User;
      let finalmessage: LanguageDB;
      let finalStatus;
      if (code) {
        userData.code = Number(code);
        const { val, message, status } = await changePassword(userData);
        userObject = val;
        finalmessage = message;
        finalStatus = status;
      } else {
        const { val, message, status } = await saveUser(userData);
        userObject = val;
        finalmessage = message;
        finalStatus = status;
      }
      if (finalStatus === 200 || finalStatus === 201) {
        setSuccessMsg(finalmessage[language]);
        login({
          email: userObject.email,
          role: userObject.role,
          id: userObject.id,
          available: userObject.available,
          cellphone: userObject.cellphone,
          username: userObject.username,
          photo: userObject.photo,
          following: userObject.following,
          favorites: userObject.favorites,
        });
        handleNavigate("/profile");
        return;
      }
      setErrorMsg(finalmessage[language]);
    },
    defaultVales: {
      email: email ?? "",
    },
  });

  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(auth, provider);

      if (credential.user) {
        const userDto: UserDTO = {
          email: credential.user?.email ?? "",
          password: "",
        };

        const { val: userObject, status, message } = await saveUser(userDto);
        if (status === 200 || status === 201) {
          setSuccessMsg(message[language]);
          login({
            email: userObject.email,
            role: userObject.role,
            id: userObject.id,
            available: userObject.available,
            following: userObject.following,
            favorites: userObject.favorites,
          });
          handleNavigate("/profile");
          return;
        }
        setErrorMsg(message[language]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleLoginGoogle,
    register,
    handleOnSubmit,
    errors,
    isSignUpPending,
  };
};
