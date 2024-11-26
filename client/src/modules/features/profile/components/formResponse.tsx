import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";

import { responseSchema } from "../validations/response.schema";
import { useForm } from "@/core/hooks/useForm";
import { postResponse } from "../api/endpoints";

type ParamsType = {
  questionId: number;
  realEstateId: number;
};
export const FormResponse = ({ questionId, realEstateId }: ParamsType) => {
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingQuestion,
    setSuccessMsg,
    setErrorMsg,
    reset,
  } = useForm({
    schema: responseSchema,
    form: async (data) => {
      data.real_estate_id = realEstateId;
      data.question_id = questionId;
      const res = await postResponse(data);
      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message);
        reset();
      } else {
        setErrorMsg(res.message);
      }
    },
  });

  return (
    <FormComponent
      isPending={isPendingQuestion}
      handleOnSubmit={handleOnSubmit}
      btnText={"Responder"}
      spaceBtn={false}
      smallBtn={true}
      centerBtn={true}
      children={
        <>
          <Input
            error={errors.response_text}
            register={register("response_text")}
            text={"Respuesta"}
            smallInput={true}
          />
        </>
      }
    />
  );
};
