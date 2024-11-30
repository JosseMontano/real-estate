import { useUserSchema } from "./validations/signUp";
import { useForm } from "@/core/hooks/useForm";
import useAuthStore from "@/core/store/auth";
import { FormAuth } from "./components/formAuth";
import { useLanguageStore } from "@/core/store/language";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "@/core/libs/firebase";
import { changePassword, saveUser } from "./utils/saveUser";
import { UserDTO } from "./api/dtos";
import useNavigation from "@/core/hooks/useNavigate";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { User } from "@/core/types/user";
import { LanguageDB } from "@/shared/types/language";

export const AuthPage = () => {
  const { texts, language } = useLanguageStore();
  const { login } = useAuthStore();
  const { handleNavigate } = useNavigation();
  const { code, email } = useParams<{ code?: string; email?: string }>();
  const userSchema = useUserSchema();

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
      let finalmessage:LanguageDB;
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
          confirmPassword: "",
        };

        const { val: userObject, status, message } = await saveUser(userDto);
        if (status === 200 || status === 201) {
          setSuccessMsg(message[language]);
          login({
            email: userObject.email,
            role: 2,
            id: userObject.id,
            available: userObject.available,
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

  useEffect(() => {
    // Check if parameters exist and log them
    if (code && email) {
      console.log(`ID: ${code}, Email: ${email}`);
    } else {
      console.log("No reset password parameters provided");
    }
  }, [code, email]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg m-[3%] p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {texts.titleAuth}
        </h2>
        <FormAuth
          errors={errors}
          handleOnSubmit={handleOnSubmit}
          isSignUpPending={isSignUpPending}
          register={register}
          handleLoginGoogle={handleLoginGoogle}
          texts={texts}
        />
      </div>
    </div>
  );
};
