import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../core/libs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { userSchema } from "./validations/signUp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define your User type
type User = {
  id?: string;
  userName: string;
  cellphoneNumber: string;
  email: string;
  qualification: number;
  codeRecuperation: string;
  role: number; // 1: admin, 2: user
  available: boolean;
};

// Infer the TypeScript types from the Zod schema
type UserFormData = z.infer<typeof userSchema>;

// Firestore function to add user
async function addUserToFirestore(userId: string, userData: UserFormData) {
  const user: User = {
    userName: userData.userName,
    cellphoneNumber: userData.cellphoneNumber,
    email: userData.email,
    role: 2,
    available: true,
    qualification: 0,
    codeRecuperation: "",
  };

  await setDoc(doc(db, "users", userId), user);
}

// Sign-up function with Firebase
async function signUp(email: string, password: string, userData: UserFormData) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await addUserToFirestore(user.uid, userData);
  return user;
}

export type ResType<T>={
    message:string;
    data:T;
    status:number;
}

export const AuthPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });
  const queryClient = useQueryClient();
  // useMutation for handling signup
  const {
    mutate: mutateSignUp,
    isPending: isSignUpPending,
    isError: isSignUpError,
    error: signUpError,
    isSuccess: isSignUpSuccess,
  } = useMutation({
    mutationFn: (data: UserFormData) => signUp(data.email, data.password, data),
    onSuccess: async (data) => {
      // Invalidate the user query to refetch the user data
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("User signed up successfully", data);
    },
  });

  const onSubmit = (data: UserFormData) => {
    mutateSignUp(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="userName">Username</label>
          <input id="userName" type="text" {...register("userName")} />
          {errors.userName && <p>{errors.userName.message}</p>}
        </div>

        <div>
          <label htmlFor="cellphoneNumber">Cellphone Number</label>
          <input id="cellphoneNumber" type="text" {...register("cellphoneNumber")} />
          {errors.cellphoneNumber && <p>{errors.cellphoneNumber.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={isSignUpPending}>
          {isSignUpPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {isSignUpError && <p>Error: {signUpError.message}</p>}
      {isSignUpSuccess && <p>Sign up successful!</p>}
    </div>
  );
};
