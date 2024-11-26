import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";

import { forgotPassSchema } from "../validations/forgotPass";
import { useForm } from "@/core/hooks/useForm";
import { forgotPass } from "../api/endpoints";

type ParamsType = {
    handleStateModal: () => void
};
export const ForgotPass = ({handleStateModal}: ParamsType) => {
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
        setSuccessMsg(res.message);
        handleStateModal();
      } else {
        setErrorMsg(res.message);
      }
    },
  });

  return (
    <>
      <FormComponent
        btnText="Guardar"
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
