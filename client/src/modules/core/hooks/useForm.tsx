import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm as useFormHook } from "react-hook-form";
import { z } from "zod";

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
  } = useFormHook<FormType>({
    resolver: zodResolver(schema),
  });

  const {
    mutate,
     isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data: FormType) => form(data),
  });

  const onSubmit = (data: FormType) => mutate(data);
  const handleOnSubmit = handleSubmit(onSubmit);

  return {
    register,
    handleOnSubmit,
    errors,
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
    onSubmit
  };
};