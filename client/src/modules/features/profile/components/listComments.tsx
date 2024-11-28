import FormComponent from "@/core/components/form/form";
import { useForm } from "@/core/hooks/useForm";
import { commentSchema } from "../validations/comment.schema";
import { Input } from "@/core/components/form/input";
import { User } from "@/core/types/user";
import imgDefault from "@/shared/assets/noPhoto.jpg";
import { SendIcon } from "@/shared/assets/icons/sendIcon";
import { StarFill } from "@/shared/assets/icons/starFill";
import { RealEstate } from "@/shared/types/realEstate";
import { useModal } from "@/core/hooks/useModal";
import { ShowModal } from "@/core/components/form/modal";
import { useState } from "react";
import { RowIcon } from "@/shared/assets/icons/rowIcon";
import Btn from "@/core/components/form/button";
import { postComment } from "../api/endpoints";

type ParamsType = {
  user: User;
  selectedRE: RealEstate | null;
};
export const ListComments = ({ user, selectedRE }: ParamsType) => {
  const { handleStateModal, isModalOpen } = useModal();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const {
    register,
    handleOnSubmit,
    errors,
    isPending: isPendingQuestion,
    setSuccessMsg,
    setErrorMsg,
    reset,
  } = useForm({
    schema: commentSchema,
    form: async (data) => {
      data.real_estate_id = selectedRE?.id;
      data.commentator_id = user.id;
      data.amount_star = selectedIndex;
      const res = await postComment(data);
      console.log(res);
      if (res.status == 200 || res.status == 201) {
        setSuccessMsg(res.message);
        reset();
      } else {
        setErrorMsg(res.message);
      }
    },
  });

  return (
    <>
      <div className="h-[250px] -m-5 py-2 px-5 overflow-y-auto flex flex-col gap-3">
        <h1 className="text-justify font-bold text-gray-900 ">Comentarios</h1>
        <div>
          <FormComponent
            isPending={isPendingQuestion}
            handleOnSubmit={handleOnSubmit}
            btnText={"Responder"}
            spaceBtn={false}
            smallBtn={true}
            centerBtn={true}
            showBtn={false}
            children={
              <div className="flex items-center gap-2">
                <img
                  src={user.photo ?? imgDefault}
                  alt="user-image"
                  className="w-10 h-10 rounded-full"
                />
                <Input
                  error={errors.comment_text}
                  register={register("comment_text")}
                  text={"Comentario"}
                  /* @ts-ignore */
                  Icon={SendIcon}
                  positionIcon="right"
                  onClickIcon={handleOnSubmit}
                />
                <span
                  className="text-yellow-300 text-base md:text-2xl cursor-pointer"
                  onClick={handleStateModal}
                >
                  <StarFill size="25" />
                </span>
              </div>
            }
          />
        </div>

        <div></div>

        <ShowModal
          isModalOpen={isModalOpen}
          setIsModalOpen={handleStateModal}
          title="Cantidad de estrellas"
          children={
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer text-base md:text-2xl ${
                      (selectedIndex !== null && index <= selectedIndex) ||
                      (hoverIndex !== null && index <= hoverIndex)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <StarFill size="25" />
                  </span>
                ))}
              </div>

              <div
                className="bg-primary rounded-md text-white cursor-pointer"
                onClick={handleStateModal}
              >
                <RowIcon size={24} />
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};
