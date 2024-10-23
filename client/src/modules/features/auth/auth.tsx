import { userSchema } from "./validations/signUp";
import { addUserToDB, findUser } from "./api/endpoints";
import { useForm } from "@/core/hooks/useForm";
import { Input } from "@/core/components/form/input";
import useAuthStore from "@/core/store/auth";
import { User } from "@/core/types/user";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import FormComponent from "@/core/components/form/form";

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
    handleOnSubmit,
    errors,
    isPending: isSignUpPending,
  } = useForm({
    schema: userSchema,
    form: async (userData) => {
      let userObject = {} as User;
      const queryFindUser = await findUser(userData.email);

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

  return (
    <div>
      <FormComponent
        isPending={isSignUpPending}
        handleOnSubmit={handleOnSubmit}
        btnText="Iniciar"
        children={
          <>
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
          </>
        }
      />
    </div>
  );
};
