import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";

import { questionSchema } from "../validations/question.schema";
import { addQuestionToDB } from "../api/endpoints";
import { useForm } from "@/core/hooks/useForm";

export const Questions = () => {
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
    <div className="flex justify-center border-gray-200 border-t-[1px] py-7">
      <div className="flex flex-row gap-5">
        <div className="w-[400px] flex flex-col gap-5">
          <h3 className="text-4xl">
            Haz una <b className="text-4xl font-semibold secondary">pregunta</b>
          </h3>
          <p className="text-sm">
            Tus preguntas se visualizarán en las publicaciones para que los
            propietarios puedan responder de forma automática.
          </p>
        </div>

        <div className="h-full flex flex-col justify-center">
          <FormComponent
            isPending={isPendingQuestion}
            handleOnSubmit={handleOnSubmit}
            btnText="Guardar"
            spaceBtn={false}
            children={
              <>
                <Input
                  text="¿Qué te gustaría saber?"
                  error={errors.question}
                  register={register("question")}
                  className="bg-white "
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};
