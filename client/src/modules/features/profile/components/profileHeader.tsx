import { StarFill } from "@/shared/assets/icons/starFill";
import imgDefault from "@/shared/assets/profile.jpeg";
import { ProfileImageUploader } from "./changeImagePerfil";
import { ModalType } from "@/core/hooks/useModal";
import { Comments } from "@/core/types/commets";
import Btn from "@/core/components/form/button";
type ParamasType = {
  profileImageUrl: string | null;
  handleImageUpload: (url: string) => void;
  handleStateModal: () => void;
  isModalOpen: Boolean;
  ShowModal: ({ children, title, modalId }: ModalType) => JSX.Element;
  commets: Comments[];
  loading: boolean;
};
export const ProfileHeader = ({
  handleImageUpload,
  profileImageUrl,
  ShowModal,
  handleStateModal,
  isModalOpen,
  commets,
  loading,
}: ParamasType) => {
  console.log(loading);
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
            ShowModal={ShowModal}
            handleStateModal={handleStateModal}
            isModalOpen={isModalOpen}
          />
        </div>
      </div>

      <p className="font-bold text-xl">Comentarios</p>
      <div className="flex flex-col gap-2">
        {loading ? (
          <p className="text-xl font-bold"> Cargando...</p>
        ) : (
          commets.map((comment) => (
            <div className="flex gap-3">
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
      <Btn
        isPending={false}
        text="Agregar comentario"
        className="max-w-max px-2"
      />
    </div>
  );
};
