import { userSchema } from "./validations/signUp";
import { signUpFirebase } from "./api/auth";
import { UserFormData } from "./types/user";
import { useForm } from "@/core/hooks/useForm";
import { FieldError } from "react-hook-form";

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

  const onSubmit = (data: UserFormData) => {
    mutateSignUp(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <p>{(errors.email as FieldError).message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <p>{(errors.password as FieldError).message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p>{(errors.confirmPassword as FieldError).message}</p>
          )}
        </div>

        <button type="submit" disabled={isSignUpPending}>
          {isSignUpPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {isSignUpError && signUpError && <p>Error: {signUpError.message}</p>}
      {isSignUpSuccess && <p>Sign up successful!</p>}
    </div>
  );
};
