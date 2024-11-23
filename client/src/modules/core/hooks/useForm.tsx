import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { DefaultValues, useForm as useFormHook } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
type ParamsType<T extends z.ZodType<any, any>> = {
  schema: T;
  form: (data: z.infer<T>) => Promise<any>;
  defaultVales?: DefaultValues<z.TypeOf<T>>;
};

export const useForm = <T extends z.ZodType<any, any>>({
  schema,
  form,
  defaultVales,
}: ParamsType<T>) => {
  type FormType = z.infer<T>;
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormHook<FormType>({
    resolver: zodResolver(schema),
    defaultValues: defaultVales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormType) => form(data),
  });

  const onSubmit = (data: FormType) => mutate(data);
  const handleOnSubmit = handleSubmit(onSubmit);

  useEffect(() => {
    if (errorMsg !="") toast.success(errorMsg || "Error");
    if (successMsg !="") toast.success(successMsg);
    console.log('hi');
    console.log(errors);
  }, [errorMsg, successMsg, successMsg, errors]);

  return {
    reset,
    register,
    handleOnSubmit,
    errors,
    mutate,
    isPending,
    setErrorMsg,
    onSubmit,
    setSuccessMsg,
  };
};
