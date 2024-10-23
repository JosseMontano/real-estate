import { FieldError } from "react-hook-form";

type ParamsType = {
    text:string
    error:FieldError | undefined
    register: any
    type?:string
}
export const Input = ({text, error, register,type="text"}:ParamsType) => {
    return (
       <>
           <input type={type} placeholder={text} {...register} />
           {error && <p>{(error as FieldError).message}</p>}
       </>
    );
}