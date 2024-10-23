import { useForm } from "@/core/hooks/useForm";
import { questionSchema } from "./validations/question.schema";
import { addQuestionToDB } from "./api/endpoints";
import { Input } from "@/core/components/form/input";
import FormComponent from "@/core/components/form/form";

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
      <FormComponent
        isPending={isPendingQuestion}
        handleOnSubmit={handleOnSubmit}
        btnText="Guardar"
        children={
          <>
            <Input
              text="Pregunta"
              error={errors.question}
              register={register("question")}
            />
          </>
        }
      />
    </div>
  );
};
