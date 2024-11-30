import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type ParamsType = {
  isPendingQuestion: boolean;
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  btn: string;
  placeHolder: string;
  errors: FieldErrors<{
    question: string;
  }>;
  register: UseFormRegister<{
    question: string;
  }>;
};
export const FormQuestion = ({
  isPendingQuestion,
  handleOnSubmit,
  btn,
  placeHolder,
  errors,
  register,
}: ParamsType) => {
  return (
    <div className="h-full flex flex-col justify-center">
      <FormComponent
        isPending={isPendingQuestion}
        handleOnSubmit={handleOnSubmit}
        btnText={btn}
        spaceBtn={false}
        children={
          <>
            <Input
              type="text"
              error={errors.question}
              register={register("question")}
              text={placeHolder}
            />
          </>
        }
      />
    </div>
  );
};
