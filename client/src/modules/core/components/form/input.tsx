import { FieldError } from "react-hook-form";

type ParamsType = {
    text:string
    error:FieldError | undefined
    register: any
}
export const Input = ({text, error, register}:ParamsType) => {
    return (
       <>
           <input type="string" placeholder={text} {...register} />
           {error && <p>{(error as FieldError).message}</p>}
       </>
    );
}