import { StarFill } from "@/shared/assets/icons/starFill";
import imgDefault from "@/shared/assets/profile.jpeg";
import { User } from "@/core/types/user";
type ParamasType = {
  profileImageUrl: string | null;
  isModalOpen: boolean;
  handleShowModal: () => void;
  commets: Comment[];
  loading: boolean;
  user: User;
  commentsLanguage: string;
};
export const ProfileHeader = ({
  profileImageUrl,
  commets,
  commentsLanguage,
}: ParamasType) => {
  return (
    <div className="flex flex-col gap-4 w-full md:pr-5">
      <div className=" flex flex-col gap-3 ">
        <div>
          {profileImageUrl ? (
            <img className="w-full " src={profileImageUrl} alt="Profile" />
          ) : (
            <img className="w-full " src={imgDefault} alt="Profile" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full max-h-[450px] md:items-start items-center">
        <div className="flex items-end w-full">
          <p className="text-[#929191] text-xl">{commentsLanguage}</p>
          <div className="w-full h-px bg-gray-300 mb-[6px] text-transparent">
            line
          </div>
        </div>
        <div className="overflow-y-scroll w-full">
          {commets.length == 0 && (
            <>
              <div className="w-full flex gap-3">
                <div className="basis-2/12">
                  <img
                    src={imgDefault}
                    alt="imagen por defecto"
                    className="rounded-full "
                  />
                </div>
                <div className="basis-9/12 flex-wrap text-sm">
                  <p className="font-semibold">email@example.com</p>
                  <p className="text-[#888787]">
                    Comentario example: La casa esta bonita
                  </p>
                </div>
                <div className="basis-1/12 flex items-center justify-center">
                  <p className=" text-base md:text-xl font-semibold mx-1">3</p>
                  <div className="flex space-x-1">
                    {/* Estrellas de calificación */}
                    <span className="text-yellow-400 text-base md:text-2xl">
                      <StarFill size="20" />
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
