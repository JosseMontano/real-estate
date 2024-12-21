import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { DefaultValues, useForm as useFormHook } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
  const { language } = useLanguageStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
    trigger,
    getValues,
  } = useFormHook<FormType>({
    resolver: zodResolver(schema),
    defaultValues: defaultVales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormType) => form(data),
  });

  const onSubmit = (data: FormType) => mutate(data);
  const handleOnSubmit = handleSubmit(onSubmit);

  const isFirstVisit = useRef(true)

  useEffect(() => {
    if (isSubmitted ) {
      if (errorMsg != "") toast.success(errorMsg || "Error");
      if (successMsg != "") toast.success(successMsg);
    }
  }, [isSubmitted, errorMsg, successMsg]);


  useEffect(() => {
    const allValues = getValues(); 
    const hasValues = Object.values(allValues).some(
      (value) => value !== undefined && value !== null && value !== ""
    );
    const hasErrors = Object.keys(errors).length > 0;

    if ((hasValues || hasErrors ) && !isFirstVisit.current) trigger();

    if (isFirstVisit) {
      isFirstVisit.current=false;
      console.log('hi');
    }
  }, [language]);

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
    trigger,
  };
};
