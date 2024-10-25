import { primaryColor } from "@/const/colors";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { GoogleIcon } from "@/shared/assets/icons/google";
import { LockIcon } from "@/shared/assets/icons/lock";
import { LockRepeatIcon } from "@/shared/assets/icons/lockRepeat";
import { UserIcon } from "@/shared/assets/icons/user";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormAuthFooter } from "./formAuthFooter";

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
        children={
          <>
            <div className="mb-4">
              <Input
                type="email"
                text="Email"
                error={errors.email}
                register={register("email")}
                className={`w-full border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                Icon={UserIcon}
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                text="Contraseña"
                error={errors.password}
                register={register("password")}
                className={`w-full border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                Icon={LockIcon}
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                text="Confirmar contraseña"
                error={errors.confirmPassword}
                register={register("confirmPassword")}
                className={`w-full border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[${primaryColor}]`}
                Icon={LockRepeatIcon}
              />
            </div>
            <FormAuthFooter />
          </>
        }
      />
    </div>
  );
};
