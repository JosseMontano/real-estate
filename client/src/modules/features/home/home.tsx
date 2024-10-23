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
  } = useForm({
    schema: questionSchema,
    form: async (data) => {
       await addQuestionToDB(data);
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
    </div>
  );
};
