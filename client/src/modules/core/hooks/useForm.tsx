import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm as useFormHook } from "react-hook-form";
import { z } from "zod";

type ParamsType<T extends z.ZodType<any, any>> = {
  schema: T;
  service: (data: z.infer<T>) => Promise<any>;
};

export const useForm = <T extends z.ZodType<any, any>>({
  schema,
  service,
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
    mutationFn: (data: FormType) => service(data),
  });

  return {
    register,
    handleSubmit,
    errors,
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
  };
};