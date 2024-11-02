import { StarFill } from "@/shared/assets/icons/starFill";
import imgDefault from "@/shared/assets/profile.jpeg";
import { ProfileImageUploader } from "./changeImagePerfil";
import { Comments } from "@/core/types/commets";
import FormComponent from "@/core/components/form/form";
import { useForm } from "@/core/hooks/useForm";
import { commentSchema } from "../validations/comment.schema";
import { Input } from "@/core/components/form/input";
import { addCommentToDB } from "../api/endpoints";
import { User } from "@/core/types/user";
type ParamasType = {
  profileImageUrl: string | null;
  handleImageUpload: (url: string) => void;
  isModalOpen: boolean;
  handleShowModal: () => void
  commets: Comments[];
  loading: boolean;
  user: User;
};
export const ProfileHeader = ({
  handleImageUpload,
  profileImageUrl,
  handleShowModal,
  isModalOpen,
  commets,
  loading,
  user,
}: ParamasType) => {
  const {
    handleOnSubmit,
    errors,
    register,
    isPending: isPendingComment,
  } = useForm({
    schema: commentSchema,
    form: async (data) => {
      await addCommentToDB({
        comment: data,
        commentator: {
          available: user.available,
          cellphoneNumber: user.cellphoneNumber,
          codeRecuperation: user.codeRecuperation,
          email: user.email,
          id: user.id || "",
          qualification: user.qualification,
          role: user.role,
          userName: user.userName,
        },
        userId: user.id ? user.id : "",
        user: user,
      });
    },
    
  });
  return (
    <div className="flex space-x-4 flex-col gap-2 w-full">
      <div className=" flex flex-col gap-3 ">
        <div>
          {profileImageUrl ? (
            <img className="w-96 " src={profileImageUrl} alt="Profile" />
          ) : (
            <img className="w-96 " src={imgDefault} alt="Profile" />
          )}
        </div>

        <div>
          <ProfileImageUploader
            onImageUpload={handleImageUpload}
            handleShowModal={handleShowModal}
            isModalOpen={isModalOpen}

/>
        </div>
      </div>

      <p className="font-bold text-xl">Comentarios</p>
      <div className="flex flex-col gap-2 w-1/2 max-h-96 overflow-y-auto">
        {loading ? (
          <p className="text-xl font-bold"> Cargando...</p>
        ) : (
          commets.map((comment) => (
            <div className="grid grid-cols-2 gap-20 ">
              <div>
                <p>{comment.commentator.email}</p>
                <p>{comment.comment.es}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xl font-semibold mx-1">
                  <span className="text-lg mr-1"> Clasificacion</span>
                  {comment.commentator.qualification}
                </p>
                <div className="flex space-x-1">
                  {/* Estrellas de calificación */}
                  {[...Array(comment.amountStars)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">
                      <StarFill size="20" />
                    </span>
                  ))}
                  {[...Array(5 - Number(comment.amountStars))].map((i) => (
                    <span key={i} className="text-gray-400 text-2xl">
                      <StarFill size="20" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="max-w-max">
        <FormComponent
          isPending={isPendingComment}
          handleOnSubmit={handleOnSubmit}
          btnText="Comentar"
          children={
            <>
              <Input
                text="Comentario. . ."
                error={errors.es}
                register={register("es")}
              />
            </>
          }
        />
      </div>
    </div>
  );
};
