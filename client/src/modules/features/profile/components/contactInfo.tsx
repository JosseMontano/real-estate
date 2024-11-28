import { primaryColor } from "@/core/constants/colors";
import Btn from "@/core/components/form/button";
import { Input } from "@/core/components/form/input";
import { ShowModal } from "@/core/components/form/modal";
import { User } from "@/core/types/user";
import { ChatLeftTextFill } from "@/shared/assets/icons/chatLeftTextFill";
import { Check } from "@/shared/assets/icons/check";
import { HeartFill } from "@/shared/assets/icons/heartFill";
import { HousesFills } from "@/shared/assets/icons/housesFills";
import { StarFill } from "@/shared/assets/icons/starFill";
import { options } from "../profile";
import { GeoIcon } from "@/shared/assets/icons/geo";

type ParamsType = {
  isModalOpen: boolean;
  HandleSetIsModalOpen: () => void;
  user: User;
  calification: string;
  sendMsg: string;
  follow: string;
  reportUser: string;
  publications: string;
  favorites: string;
  addComment: string;
  placeholderComment: string;
  stateBtn: options;
  setStateBtn: (state: options) => void;
};
export const ContactInfo = ({
  user,
  isModalOpen,
  HandleSetIsModalOpen,
  calification,
  sendMsg,
  follow,
  reportUser,
  publications,
  favorites,
  addComment,
  placeholderComment,
  stateBtn,
  setStateBtn,
}: ParamsType) => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="mt-6 flex flex-col gap-2">
        <div>
          <p className=" flex gap-4 ">
            <span className="font-semibold text-xl">{user.email}</span>
            <span className="flex items-center gap-1 ">
              <GeoIcon size={14} />
              <span>Cochabamba</span>
            </span>
          </p>
          <p className="text-[#209bfb] font-semibold">{user.username}</p>
        </div>

        <div>
          <label className="text-[#929191]">{calification}</label>
          <div className="flex gap-3 items-center">
            <p className="text-base md:text-2xl font-semibold ">
              {user.qualification ?? 5}
            </p>
            <div className="flex space-x-1">
              {[...Array(user.qualification)].map((_, i) => (
                <span key={i} className="text-yellow-300 text-base md:text-2xl">
                  <StarFill size="20" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-x-6 items-center flex-wrap md">
          <div className="flex items-center w-auto gap-2 rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer">
            <ChatLeftTextFill size="20" />
            <button onClick={HandleSetIsModalOpen}> {sendMsg}</button>
          </div>

          <div
            className="flex gap-1 items-center px-2 justify-center h-8 text-white rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
            style={{ background: primaryColor }}
          >
            <Check size="19" />
            <span>{follow}</span>
          </div>

          <button className="hover:bg-gray-100 rounded-lg text-gray-400">
            {reportUser}
          </button>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className=" flex gap-7 items-center">
          <div
            onClick={() => setStateBtn("Publications")}
            className={`flex relative pb-4 gap-2 border-b-[3px]  items-center ${
              stateBtn === "Publications"
                ? " border-[#209bfb]"
                : "border-transparent"
            } `}
          >
            <span className="absolute left-[14px] bg-[#209bfb] rounded-full text-[13px] h-4 w-4 flex items-center justify-center text-white">
              5
            </span>
            <HousesFills size="23" />
            <button className="mt-1">{publications}</button>
          </div>

          <div
            onClick={() => setStateBtn("Favorites")}
            className={`flex relative gap-2 pb-4 border-b-[3px]  items-end ${
              stateBtn === "Favorites"
                ? "border-[#209bfb]"
                : "border-transparent"
            }`}
          >
            <span className="absolute left-[14px] top-[4px] bg-[#209bfb] rounded-full text-[13px] h-4 w-4 flex items-center justify-center text-white">
              2
            </span>
            <HeartFill size="20" />
            <button className="mt-1">{favorites}</button>
          </div>
          
        </div>
        <div className="w-full h-px bg-gray-300"></div>
      </div>
      <ShowModal
        title={addComment}
        isModalOpen={isModalOpen}
        setIsModalOpen={HandleSetIsModalOpen}
        children={
          <div className="flex flex-col gap-3">
            <Input text={placeholderComment} />
            <Btn isPending={false} text="Comentar" />
          </div>
        }
      />
    </div>
  );
};
