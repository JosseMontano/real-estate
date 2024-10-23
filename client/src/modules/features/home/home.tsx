import { useForm } from "@/core/hooks/useForm";
import { questionSchema } from "./validations/question.schema";
import { addQuestionToDB } from "./api/endpoints";
import { Input } from "@/core/components/form/input";

export const HomePage = () => {
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingQuestion,
    isError: isErrorQuestion,
    error: questionError,
    isSuccess: isSuccessQuestion,
  } = useForm({
    schema: questionSchema,
    form: (data) => {
      return addQuestionToDB(data);
    },
  });


  return (
    <div>
      <form onSubmit={handleOnSubmit}>
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
