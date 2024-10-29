import { primaryColor } from "@/const/colors";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { LockIcon } from "@/shared/assets/icons/lock";
import { LockRepeatIcon } from "@/shared/assets/icons/lockRepeat";
import { UserIcon } from "@/shared/assets/icons/user";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormAuthFooter } from "./formAuthFooter";
import { GoogleIcon } from "@/shared/assets/icons/google";

type ParamsType = {
  register: UseFormRegister<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  isSignUpPending: boolean;
};
export const FormAuth = ({
  errors,
  handleOnSubmit,
  isSignUpPending,
  register,
}: ParamsType) => {
  return (
    <div>
      <FormComponent
        isPending={isSignUpPending}
        handleOnSubmit={handleOnSubmit}
        btnText="Iniciar"
        children={
          <>
            <div className="mb-4">
              <Input
                type="email"
                text="Email"
                error={errors.email}
                register={register("email")}
                Icon={UserIcon}
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                text="Contraseña"
                error={errors.password}
                register={register("password")}
                Icon={LockIcon}
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                text="Confirmar contraseña"
                error={errors.confirmPassword}
                register={register("confirmPassword")}
                Icon={LockRepeatIcon}
              />
            </div>
            <FormAuthFooter />
          </>
        }
      />
      <div className="flex flex-col gap-3">
        <p className="text-center text-sm text-gray-500 mt-3">
          ¿Sin cuenta? <span>Ingresa tus datos y listo</span>
        </p>

        <p className="flex flex-col gap-3 text-center text-sm text-gray-500">
          <span>O</span>
          <span>inicia con</span>
        </p>
        <div className="flex justify-center space-x-4">
          <button className="p-[10px] border  border-gray-200 rounded-lg">
            <GoogleIcon size={29} />
          </button>
        </div>
      </div>
    </div>
  );
};
