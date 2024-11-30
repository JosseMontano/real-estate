import { ShowModal } from "@/core/components/form/modal";
import { useForm } from "@/core/hooks/useForm";
import { commentSchema } from "../validations/comment.schema";
import { handlePost } from "@/core/utils/fetch";
import useAuthStore from "@/core/store/auth";
import { RealEstate } from "@/shared/types/realEstate";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  currentRealEstate: RealEstate;
};
const Comments = ({
  isModalOpen,
  setIsModalOpen,
  currentRealEstate,
}: Props) => {
  const { user } = useAuthStore();
  const {
    register,
    handleOnSubmit,
    errors,
    isPending,
  } = useForm({
    schema: commentSchema,
    form: async (data) => {
      const res = await handlePost("translate", { val: data.commentatorEs });
      data.commentatorEn = res.val.valEn;
      data.commentaroPt = res.val.valPt;
      if (user) {
        //await addCommentToDB(data, currentRealEstate, user)
      };
    },
  });
  return (
    <ShowModal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title="Agregar comentario"
      children={
        <FormComponent
        isPending={isPending}
        handleOnSubmit={handleOnSubmit}
        btnText="Guardar"
        children={
          <>
            <Input
              text="tu comentario"
              error={errors.commentatorEs}
              register={register("commentatorEs")}
            />
          </>
        }
      />
      }
    />
  );
};

export default Comments;
