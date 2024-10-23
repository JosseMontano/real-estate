import { userSchema } from "./validations/signUp";
import { signUpFirebase } from "./api/auth";
import { useForm } from "@/core/hooks/useForm";
import { FieldError } from "react-hook-form";
import { UserDTO } from "./api/dtos";
import { Input } from "@/core/components/form/input";

export const AuthPage = () => {
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
    service: (data) => {
      return signUpFirebase(data.email, data.password, data);
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
