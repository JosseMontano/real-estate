import { useForm } from "@/core/hooks/useForm";
import { questionSchema } from "./validations/question.schema";
import { addQuestionToDB } from "./api/endpoints";
import bgImage from "@/shared/assets/bg.jpg";
import { Header } from "./components/header";
import { TitleCenter } from "./components/titleCenter";
import { SearchPropierties } from "./components/searchForm";
import { Input } from "@/core/components/form/input";
import FormComponent from "@/core/components/form/form";
import { Footer } from "./components/footer";

export const HomePage = () => {
  const {} = useForm({
    schema: questionSchema,
    form: async (data) => {
      await addQuestionToDB(data);
    },
  });

  return (
    <div>

      <div
        className="w-full h-screen relative bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="h-screen bg-black bg-opacity-50">
          <Header />
          <TitleCenter />
          <SearchPropierties />
        </div>
      </div>
      <div></div>

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
      <Footer />
    </div>
  );
};
