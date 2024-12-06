
import { useQuestionSchema } from "../validations/question";
import { addQuestionToDB } from "../api/endpoints";
import { useForm } from "@/core/hooks/useForm";
import { useLanguageStore } from "@/core/store/language";
import { FormQuestion } from "./formQuestion";


type ParamsType = {
  ask: string;
  question: string;
  description: string;
  btn: string;
  placeHolder: string;
};
export const Questions = ({
  ask,
  description,
  placeHolder,
  btn,
  question,
}: ParamsType) => {
  const { language, texts } = useLanguageStore();
  const questionSchema = useQuestionSchema();
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingQuestion,
    setSuccessMsg,
    setErrorMsg,
    reset,
  } = useForm({
    schema: questionSchema,
    form: async (data) => {
      const res = await addQuestionToDB(data);
      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message[language]);
        reset();
      } else {
        setErrorMsg(res.message[language]);
      }
    },
  });

  return (
    <div
      id="questions"
      className="flex flex-row justify-center border-gray-200 border-t-[1px] py-7"
    >
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-[300px] sm:w-[400px] flex flex-col gap-5">
          <h3 className="text-4xl">
            {ask} <b className="text-4xl font-semibold text-secondary">{question}</b>
          </h3>
          <p className="text-sm">{description}</p>
        </div>

        <FormQuestion
          btn={btn}
          placeHolder={placeHolder}
          handleOnSubmit={handleOnSubmit}
          errors={errors}
          isPendingQuestion={isPendingQuestion}
          register={register}
        />
      </div>
    </div>
  );
};
