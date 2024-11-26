import { userSchema } from "./validations/signUp";
import { useForm } from "@/core/hooks/useForm";
import useAuthStore from "@/core/store/auth";
import { FormAuth } from "./components/formAuth";
import { useLanguageStore } from "@/core/store/language";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "@/core/libs/firebase";
import { saveUser } from "./utils/saveUser";
import { UserDTO } from "./api/dtos";
import useNavigation from "@/core/hooks/useNavigate";

export const AuthPage = () => {
  const { texts } = useLanguageStore();
  const { login } = useAuthStore();
  const { handleNavigate } = useNavigation();
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
      const { val: userObject, message, status } = await saveUser(userData);
      if (status === 200 || status === 201) {
        setSuccessMsg(message);
        login({
          email: userObject.email,
          role: 2,
          id: userObject.id,
          available: userObject.available,
          cellphone: userObject.cellphone,
          username: userObject.username,
        });
        handleNavigate("/profile");
        return;
      }
      console.log(message);
      setErrorMsg(message);
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
          setSuccessMsg(message);
          login({
            email: userObject.email,
            role: 2,
            id: userObject.id,
            available: userObject.available,
          });
          handleNavigate("/profile");
          return;
        }
        setErrorMsg(message);
      }
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
