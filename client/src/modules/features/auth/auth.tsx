import { userSchema } from "./validations/signUp";
import { addUserToDB, findUser } from "./api/endpoints";
import { useForm } from "@/core/hooks/useForm";
import { UserDTO } from "./api/dtos";
import { Input } from "@/core/components/form/input";
import useAuthStore from "@/core/store/auth";
import { User } from "@/core/types/user";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

const createUserObject = (
  doc: DocumentSnapshot<DocumentData, DocumentData>
) => ({
  id: doc.id,
  email: doc.data()?.email,
  userName: doc.data()?.userName,
  cellphoneNumber: doc.data()?.cellphoneNumber,
  qualification: doc.data()?.qualification,
  codeRecuperation: doc.data()?.codeRecuperation,
  role: doc.data()?.role,
  available: doc.data()?.available,
});

export const AuthPage = () => {
  const { login } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    errors,
    mutate: mutateSignUp,
    isPending: isSignUpPending,
    isError: isSignUpError,
    error: signUpError,
    isSuccess: isSignUpSuccess,
  } = useForm({
    schema: userSchema,
    service: async (userData) => {
      const queryFindUser = await findUser(userData.email);
      let userObject = {} as User;

      if (queryFindUser.empty) {
        const doc = await addUserToDB(userData);
        if (doc.exists()) userObject = createUserObject(doc);
      } else {
        queryFindUser.forEach((doc) => {
          userObject = createUserObject(doc);
        });
      }
      login(userObject);
    },
  });

  const onSubmit = (data: UserDTO) => {
    mutateSignUp(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          text="Email"
          error={errors.email}
          register={register("email")}
        />

        <Input
          type="password"
          text="Contraseña"
          error={errors.password}
          register={register("password")}
        />

        <Input
          type="password"
          text="Confirmar contraseña"
          error={errors.confirmPassword}
          register={register("confirmPassword")}
        />

        <button type="submit" disabled={isSignUpPending}>
          {isSignUpPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {isSignUpError && signUpError && <p>Error: {signUpError.message}</p>}
      {isSignUpSuccess && <p>Sign up successful!</p>}
    </div>
  );
};
