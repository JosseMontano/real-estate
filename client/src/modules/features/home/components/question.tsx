import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";

import { questionSchema } from "../validations/question.schema";
import { addQuestionToDB } from "../api/endpoints";
import { useForm } from "@/core/hooks/useForm";

type ParamsType={
  ask:string,
  question:string,
  description:string,
  btn:string,
  placeHolder:string
}
export const Questions = ({ask, description, placeHolder, btn, question}:ParamsType) => {
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingQuestion,
    setSuccessMsg,
    setErrorMsg,
    reset
  } = useForm({
    schema: questionSchema,
    form: async (data) => {
      const res = await addQuestionToDB(data);
      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message);
        reset();
      } else {
        setErrorMsg(res.message);
      }
    },
  });

  return (
    <div id="questions" className="flex flex-row justify-center border-gray-200 border-t-[1px] py-7">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-[300px] sm:w-[400px] flex flex-col gap-5">
          <h3 className="text-4xl">
            {ask} <b className="text-4xl font-semibold secondary">{question}</b>
          </h3>
          <p className="text-sm">
            {description}
          </p>
        </div>

        <div className="h-full flex flex-col justify-center">
          <FormComponent
            isPending={isPendingQuestion}
            handleOnSubmit={handleOnSubmit}
            btnText={btn}
            spaceBtn={false}
            children={
              <>
                <Input
                  error={errors.question}
                  register={register("question")}
                  text={placeHolder}
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};
