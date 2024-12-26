import { FormAuth } from "./components/formAuth";
import { useLanguageStore } from "@/core/store/language";
import { useParams } from "react-router-dom";
import { ComeBack } from "@/core/components/comeBack";
import { useLogin } from "@/core/hooks/useLogin";

export const AuthPage = () => {
  const { texts } = useLanguageStore();
  const { code, email } = useParams<{ code?: string; email?: string }>();
  const {
    errors,
    handleLoginGoogle,
    handleOnSubmit,
    isSignUpPending,
    register,
  } = useLogin({ code, email });

  return (
    <div className=" bg-gray-100">
      <ComeBack location="/" />
      <div className="flex items-center justify-center min-h-screen">
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
    </div>
  );
};
