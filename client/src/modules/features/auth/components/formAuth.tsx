import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { LockIcon } from "@/shared/assets/icons/lock";
import { UserIcon } from "@/shared/assets/icons/user";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { GoogleIcon } from "@/shared/assets/icons/google";
import { useModal } from "@/core/hooks/useModal";
import { ShowModal } from "@/core/components/form/modal";
import { ForgotPass } from "./forgotPass";
import { Translations } from "@/core/store/language";

type ParamsType = {
  register: UseFormRegister<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  handleLoginGoogle: () => void;
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<{
    email: string;
    password: string;
  }>;
  isSignUpPending: boolean;
  texts: Translations;
};
export const FormAuth = ({
  errors,
  handleOnSubmit,
  isSignUpPending,
  register,
  handleLoginGoogle,
  texts,
}: ParamsType) => {
  const { isModalOpen, handleStateModal } = useModal();

  return (
    <div>
      <FormComponent
        isPending={isSignUpPending}
        handleOnSubmit={handleOnSubmit}
        btnText={texts.btnAuth}
        children={
          <div className="flex flex-col gap-4">
            <div className="">
              <Input
                type="email"
                text="Email"
                error={errors.email}
                register={register("email")}
                Icon={UserIcon}
              />
            </div>
            <div className="">
              <Input
                type="password"
                text="Contraseña"
                error={errors.password}
                register={register("password")}
                Icon={LockIcon}
              />
            </div>

            <div className="text-right">
              <p
                className="text-xs text-gray-700 cursor-pointer"
                onClick={handleStateModal}
              >
                {texts.forgotPasswordAuth}
              </p>
            </div>
          </div>
        }
      />
      <div className="flex flex-col gap-3">
        <p className="flex flex-col gap-3 text-center text-sm text-gray-500 mt-3">
          <span className="text-[14px]">{texts.orAuth}</span>
          <span className="text-[14px]">{texts.signInGoogleAuth}</span>
        </p>
        <div
          onClick={handleLoginGoogle}
          className="flex justify-center items-center w-full gap-3 cursor-pointer border border-primary rounded-full py-[10px]"
        >
          <button className="">
            <GoogleIcon size={29} />
          </button>
          <span className="text-[14px] text-gray-700">
            {texts.loginGoogleBtn}
          </span>
        </div> 
      </div>

      <ShowModal
        title={texts.signInGoogleAuth}
        isModalOpen={isModalOpen}
        setIsModalOpen={handleStateModal}
        children={<ForgotPass handleStateModal={handleStateModal} />}
      />
    </div>
  );
};
