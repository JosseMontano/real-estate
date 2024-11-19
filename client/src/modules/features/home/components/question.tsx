import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";

import { questionSchema } from "../validations/question.schema";
import { addQuestionToDB } from "../api/endpoints";
import { useForm } from "@/core/hooks/useForm";
import { handlePost } from "@/core/utils/fetch";

export const Questions = () => {
  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingQuestion,
  } = useForm({
    schema: questionSchema,
    form: async (data) => {
      const res = await handlePost("translate", { val: data.questionEs });
      data.questionEn = res.val.valEn;
      data.questionPt = res.val.valPt;
      await addQuestionToDB(data);
    },
  });

  return (
    <div className="flex justify-center bg-gray-100 py-7">
      <div className="flex flex-row gap-5">
        <div className="w-[400px] flex flex-col gap-5">
          <h3 className="text-4xl">
            Haz una <b className="text-4xl font-semibold">pregunta</b> para las{" "}
            <b className="text-4xl font-semibold">inmobiliarias</b>
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
            children={
              <>
                <Input
                  text="¿Qué te gustaría saber?"
                  error={errors.questionEs}
                  register={register("questionEs")}
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};
