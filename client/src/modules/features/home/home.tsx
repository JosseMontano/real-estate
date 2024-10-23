import { useForm } from "@/core/hooks/useForm";
import { questionSchema } from "./validations/question.schema";
import { addQuestionToDB } from "./api/endpoints";
import { QuestionDTO } from "./api/dtos";
import { FieldError } from "react-hook-form";
import { Input } from "@/core/components/form/input";

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
      return addQuestionToDB(data);
    },
  });

  const onSubmit = (data: QuestionDTO) => {
    mutateQuestion(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          text="Pregunta"
          error={errors.question}
          register={register("question")}
        />

        <button type="submit" disabled={isPendingQuestion}>
          {isPendingQuestion ? "Guardando..." : "Guardar"}
        </button>
      </form>

      {isErrorQuestion && questionError && (
        <p>Error: {questionError.message}</p>
      )}
      {isSuccessQuestion && <p>Se guardo la pregunta</p>}
    </div>
  );
};
