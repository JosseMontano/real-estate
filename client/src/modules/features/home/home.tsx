import { useForm } from "@/core/hooks/useForm";
import { questionSchema } from "./validations/question.schema";
import { addUQuestionToDB } from "./api/endpoints";
import { QuestionDTO } from "./api/dtos";
import { FieldError } from "react-hook-form";

type ParamsType = {};
export const HomePage = ({}: ParamsType) => {
  const {
    register,
    handleSubmit,
    errors,
    mutate: mutateQuestion,
    isPending: isPendingQuestion,
    isError: isErrorQuestion,
    error: questionError,
    isSuccess: isSuccessQuestion,
  } = useForm({
    schema: questionSchema,
    service: (data) => {
      return addUQuestionToDB(data);
    },
  });

  const onSubmit = (data: QuestionDTO) => {
    mutateQuestion(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="question">Pregunta</label>
          <input type="string" {...register("question")} />
          {errors.question && <p>{(errors.question as FieldError).message}</p>}
        </div>

        <button type="submit" disabled={isPendingQuestion}>
          {isPendingQuestion ? "Guardando..." : "Guardar"}
        </button>
      </form>

      {isErrorQuestion && questionError && <p>Error: {questionError.message}</p>}
      {isSuccessQuestion && <p>Se guardo la pregunta</p>}
    </div>
  );
};
