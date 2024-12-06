import { StarFill } from "@/shared/assets/icons/starFill";
import imgDefault from "@/shared/assets/noPhoto.jpg";
import { User } from "@/core/types/user";
import { Comment } from "@/shared/types/questions";
import { useLanguageStore } from "@/core/store/language";

type ParamasType = {
  isModalOpen: boolean;
  handleShowModal: () => void;
  commets: Comment[];
  loading: boolean;
  user: User;
  commentsLanguage: string;
};
export const ProfileHeader = ({
  commets,
  commentsLanguage,
  user,
}: ParamasType) => {
  const { language, texts } = useLanguageStore();
  return (
    <div className="flex flex-col gap-4 w-full h-full md:pr-5 justify-center ">
      <div className=" flex flex-col items-center gap-3 ">
        <div className="">
          <img
            className=" rounded-full h-64 w-64"
            src={user.photo ?? imgDefault}
            alt="Profile"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full max-h-[450px] md:items-start items-center">
        <div className="flex flex-col items-center w-full">
          <p className="text-[#929191] text-xl">{commentsLanguage}</p>
          <div className="w-full h-px bg-gray-300 mb-[6px] text-transparent">
          
          </div>
        </div>
        <div className="overflow-y-scroll w-full">
          {commets.length == 0 && <p className="text-center text-[#424242]">{texts.emptyComments}</p>}
          {commets.map((v) => (
            <div className="w-full flex gap-3 items-center">
              <img
                src={v.commentator.photo ?? imgDefault}
                alt="imagen por defecto"
                className="rounded-full w-9 h-9"
              />

              <div className=" flex-wrap text-sm w-[175px]">
                <p className="font-semibold">{v.commentator.email}</p>
                <p className="text-[#888787]">{v.comment[language]}</p>
              </div>

              <div className="flex items-center gap-1">
                <p className=" text-base md:text-xl font-semibold">3</p>
                <div className="flex ">
                  <span className="text-yellow-400 text-base md:text-2xl">
                    <StarFill size="20" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
