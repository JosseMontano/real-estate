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
      const res = await handlePost("translate", {val: data.questionEs});
      data.questionEn = res.val.valEn;
      data.questionPt = res.val.valPt;
      await addQuestionToDB(data);
    },
  });

  return (
    <div className="flex justify-center bg-gray-100 py-7">
      <div className="w-[300px] flex flex-col gap-5">
        <h3 className="text-3xl">
          Haz una <span>pregunta</span> para las <span>inmobiliarias</span>
        </h3>
        <p className="text-[10px]">
          Tus preguntas se visualizaran en las publicaciones para que los
          propietarios puedan responder, de esa manera se automatiza el tiempo
          al momento de obtener informacion de los inmuebles
        </p>
        <div className="self-center">
          <FormComponent
            isPending={isPendingQuestion}
            handleOnSubmit={handleOnSubmit}
            btnText="Guardar"
            children={
              <>
                <Input
                  text="tu pregunta"
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
