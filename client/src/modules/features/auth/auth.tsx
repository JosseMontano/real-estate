import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../core/libs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { userSchema } from "./validations/signUp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


type User = {
    id?: string; 
    userName: string;
    cellphoneNumber: string;
    email: string;
    qualification: number;
    codeRecuperation: string;
    role: number; // 1: admin, 2: user
    available: boolean;
}
// Infer the TypeScript types from the Zod schema
type UserFormData = z.infer<typeof userSchema>;
export async function addUserToFirestore(userId: string, userData: UserFormData) {
    try {
        const user: User = {
            userName: userData.userName,
            cellphoneNumber: userData.cellphoneNumber,
            email: userData.email,
            role: 2,
            available: true,
            qualification: 0,
            codeRecuperation: "",
        }
      await setDoc(doc(db, "users", userId), user);
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
      throw error;
    }
  }

async function signUp(email: string, password: string, userData: UserFormData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Store additional user information in Firestore
      await addUserToFirestore(user.uid, userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

export const AuthPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  // Handle form submission
  const onSubmit = async (data: UserFormData) => {
    await signUp(data.email, data.password, data)
  };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          type="text"
          {...register("userName")}
        />
        {errors.userName && <p>{errors.userName.message}</p>}
      </div>

      <div>
        <label htmlFor="cellphoneNumber">Cellphone Number</label>
        <input
          id="cellphoneNumber"
          type="text"
          {...register("cellphoneNumber")}
        />
        {errors.cellphoneNumber && <p>{errors.cellphoneNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Sign Up</button>
    </form>
    );
}

