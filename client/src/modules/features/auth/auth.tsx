import { userSchema } from "./validations/signUp";
import { addUserToDB, findUser } from "./api/endpoints";
import { useForm } from "@/core/hooks/useForm";
import useAuthStore from "@/core/store/auth";
import { User } from "@/core/types/user";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { FormAuth } from "./components/formAuth";
import { useLanguageStore } from "@/core/store/language";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "@/core/libs/firebase";
import { saveUser } from "./utils/saveUser";
import { UserDTO } from "./api/dtos";

export const AuthPage = () => {
  const { texts } = useLanguageStore();
  const { login } = useAuthStore();
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isSignUpPending,
  } = useForm({
    schema: userSchema,
    form: async (userData) => {
      const userObject = await saveUser(userData);
      login(userObject);
    },
  });

  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(auth, provider);
      const userDto: UserDTO = {
        email: credential.user?.email ?? "",
        password: "",
        confirmPassword: "",
      };
      const userObject = await saveUser(userDto);
      login(userObject);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {texts.titleAuth}
        </h2>
        <FormAuth
          errors={errors}
          handleOnSubmit={handleOnSubmit}
          isSignUpPending={isSignUpPending}
          register={register}
          handleLoginGoogle={handleLoginGoogle}
        />
      </div>
    </div>
  );
};
