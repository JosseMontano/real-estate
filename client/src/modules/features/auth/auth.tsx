import { userSchema } from "./validations/signUp";
import { addUserToDB, findUser } from "./api/endpoints";
import { useForm } from "@/core/hooks/useForm";
import useAuthStore from "@/core/store/auth";
import { User } from "@/core/types/user";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { FormAuth } from "./components/formAuth";
import { useLanguageStore } from "@/core/store/language";

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
  const {texts}=useLanguageStore()
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">{texts.titleAuth}</h2>
        <FormAuth
          errors={errors}
          handleOnSubmit={handleOnSubmit}
          isSignUpPending={isSignUpPending}
          register={register}
        />
      </div>
    </div>
  );
};
