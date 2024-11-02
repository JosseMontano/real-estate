import { StarFill } from "@/shared/assets/icons/starFill";
import imgDefault from "@/shared/assets/profile.jpeg";
import { ProfileImageUploader } from "./changeImagePerfil";
import { ModalType } from "@/core/hooks/useModal";
type ParamasType = {
  profileImageUrl: string | null;
  handleImageUpload: (url: string) => void;
  handleStateModal: () => void;
  isModalOpen: Boolean;
  ShowModal: ({ children, title, modalId }: ModalType) => JSX.Element;
};
export const ProfileHeader = ({
  handleImageUpload,
  profileImageUrl,
  ShowModal,
  handleStateModal,
  isModalOpen,
}: ParamasType) => {
  return (
    <div className="flex space-x-4 flex-col gap-2 w-full">
      <div className=" flex flex-col gap-3 ">
        <div >
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

      <p>Comentarios</p>
      <div className="flex flex-row items-center gap-2">
        <p>Example@gmail.com</p>
        <div className="flex flex-col">
          <p className="text-xl font-semibold mx-1">5</p>
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-2xl">
                <StarFill size="20" />
              </span>
            ))}
            <span className="text-gray-400 text-2xl">
              <StarFill size="20" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
