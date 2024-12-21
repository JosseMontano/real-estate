import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";

import {  useForgotPassSchema } from "../validations/forgotPass";
import { useForm } from "@/core/hooks/useForm";
import { forgotPass } from "../api/endpoints";
import { useLanguageStore } from "@/core/store/language";

type ParamsType = {
    handleStateModal: () => void
};
export const ForgotPass = ({handleStateModal}: ParamsType) => {
  const {language,texts} = useLanguageStore()
  const forgotPassSchema=useForgotPassSchema()
  const {
    register,
    handleOnSubmit,
    errors,
    isPending,
    setSuccessMsg,
    setErrorMsg,
  } = useForm({
    schema: forgotPassSchema,
    form: async (data) => {
      const res = await forgotPass(data);
      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message[language]);
        setTimeout(() => {
          handleStateModal();
        }, 2000);
      } else {
        setErrorMsg(res.message[language]);
      }
    },
  });

  return (
    <>
      <FormComponent
        btnText={texts.recuperateAccountBtn}
        handleOnSubmit={handleOnSubmit}
        isPending={isPending}
        children={
          <>
            <Input
              text="Email"
              error={errors.email_receiver}
              register={register("email_receiver")}
            />
          </>
        }
      />
    </>
  );
};
