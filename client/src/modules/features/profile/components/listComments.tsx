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
import { fetchCommentsByRE, postComment } from "../api/endpoints";
import useGet from "@/core/hooks/useGet";
import { Language, Translations } from "@/core/store/language";
import { deleteComment } from "@/features/dashComments/api/endpoints";
import { useDelete } from "@/core/hooks/useDelete";
import { queryClient } from "../../../../App";

type ParamsType = {
  user: User;
  selectedRE: RealEstate | null;
  language: Language;
  texts: Translations;
  refetchCommentTop: () => void;
};
export const ListComments = ({
  user,
  selectedRE,
  language,
  texts,
  refetchCommentTop,
}: ParamsType) => {
  const { handleStateModal, isModalOpen } = useModal();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { data: comments, refetch } = useGet({
    services: () => fetchCommentsByRE(selectedRE?.id || 0),
    queryKey: ["comments-by-readl-estate", user?.id],
    itemsPerPage: 100,
    valueToService: user?.id,
  });

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
      data.amount_star = selectedIndex + 1;
      const res = await postComment(data);
      if (res.status == 200 || res.status == 201) {
        const updatedComments = [...comments, res.val];

        queryClient.setQueryData(
          ["comments-by-readl-estate", user?.id],
          updatedComments
        );

        setSuccessMsg(res.message[language]);
        reset();

        refetchCommentTop();
      } else {
        setErrorMsg(res.message[language]);
      }
    },
  });

  const { mutateToState } = useDelete({
    service: deleteComment,
    refetch: () => {
      refetch();
      refetchCommentTop();
    },
  });

  return (
    <>
      <div className="h-[250px] -m-5 py-2 px-5 overflow-y-auto flex flex-col gap-3">
        <h1 className="text-justify font-bold text-gray-900 ">
          {texts.commentsTitlteVisitUser}
        </h1>
        <div>
          <FormComponent
            isPending={isPendingQuestion}
            handleOnSubmit={handleOnSubmit}
            btnText={"Responder"}
            spaceBtn={false}
            smallBtn={true}
            centerBtn={true}
            showBtn={false}
            useMargin={false}
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
                  text={texts.inputCommentVisitUser}
                  /* @ts-ignore */
                  Icon={SendIcon}
                  positionIcon="right"
                  onClickIcon={handleOnSubmit}
                  handleOnSubmit={handleOnSubmit}
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

        <div>
          {comments?.map((v) => (
            <div className="flex items-center gap-3">
              <img
                src={v.commentator.photo ?? imgDefault}
                alt="user-image"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[17px] font-semibold">
                  {v.commentator.email}
                </p>
                <span className="text-[13px] text-gray-800">
                  {v.comment[language]}
                </span>
                <p className="flex gap-2 items-center">
                  {user.email == v.commentator.email ? (
                    <span
                      className="text-[10px] cursor-pointer"
                      onClick={() => mutateToState(Number(v.id))}
                    >
                      Eliminar
                    </span>
                  ) : (
                    <span className="text-[10px] cursor-pointer">
                      {texts.reportUser}
                    </span>
                  )}

                  <span className="text-[10px] flex gap-1 items-center">
                    <span className="text-[10px]">{v.amount_star}</span>
                    <span
                      className="text-yellow-300 text-[10px]"
                      onClick={handleStateModal}
                    >
                      <StarFill size="12" />
                    </span>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

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
                className="bg-primary rounded-md mt-[11px] text-white cursor-pointer"
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
