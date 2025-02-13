import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { DefaultValues, useForm as useFormHook, Controller } from "react-hook-form";
import { z } from "zod";
import { handleToast } from "../helpers/toast";
import { useEffect, useRef, useState } from "react";
import { useLanguageStore } from "../store/language";

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
  const isMounted = useRef(false);
 const { texts}= useLanguageStore()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, touchedFields },
    reset,
    trigger,
    setError,
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
    if (isSubmitted) {
    if (errorMsg != "") handleToast(errorMsg || "Error",texts.sucess );
    if (successMsg != "") handleToast(successMsg, texts.sucess);
    }
  }, [isSubmitted, errorMsg, successMsg]);

  useEffect(() => {
    if (isMounted.current) {
      if (isSubmitted || Object.keys(touchedFields).length > 0) {
        trigger().then((isValid) => {
          if (!isValid) {
            Object.entries(errors).forEach(([field, error]) => {
              // @ts-ignore
              setError(field as keyof typeof errors, {
                type: error?.type,
                // @ts-ignore
                message: schema.shape[field].message,
              });
            });
          }
        });
      }
    } else {
      isMounted.current = true;
    }
  }, [schema, reset, trigger, setError, isSubmitted, touchedFields]);

  return {
    reset,
    control,
    register,
    handleOnSubmit,
    errors,
    mutate,
    isPending,
    setErrorMsg,
    onSubmit,
    setSuccessMsg,
    trigger,
    Controller
  };
};
