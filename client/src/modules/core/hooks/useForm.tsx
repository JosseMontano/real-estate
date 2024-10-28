import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm as useFormHook } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect } from "react";
type ParamsType<T extends z.ZodType<any, any>> = {
  schema: T;
  form: (data: z.infer<T>) => Promise<any>;
};

export const useForm = <T extends z.ZodType<any, any>>({
  schema,
  form,
}: ParamsType<T>) => {
  type FormType = z.infer<T>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormHook<FormType>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (data: FormType) => form(data),
  });

  const onSubmit = (data: FormType) => mutate(data);
  const handleOnSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    if (isError) toast.success(error?.message || "Error");
    if (isSuccess) toast.success("Inicio de sesion correcto!");
  }, [error,isError, isSuccess]);

  return {
  reset,
    register,
    handleOnSubmit,
    errors,
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
    onSubmit,
  };
};
