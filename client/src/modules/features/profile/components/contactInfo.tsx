import { primaryColor } from "@/core/const/colors";
import Btn from "@/core/components/form/button";
import FormComponent from "@/core/components/form/form";
import { Input } from "@/core/components/form/input";
import { ShowModal } from "@/core/components/form/modal";
import { User } from "@/core/types/user";

import { ChatLeftTextFill } from "@/shared/assets/icons/chatLeftTextFill";
import { Check } from "@/shared/assets/icons/check";
import { HeartFill } from "@/shared/assets/icons/heartFill";
import { HousesFills } from "@/shared/assets/icons/housesFills";
import { StarFill } from "@/shared/assets/icons/starFill";
import { useState } from "react";

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
}: ParamsType) => {
  type options = "Publications" | "Favorites";
  const [stateBtn, setStateBtn] = useState<options>("Publications");
  return (
    <div className="flex flex-col gap-10">
      <div className="mt-6 flex flex-col gap-5">
        <div>
          <p className="font-semibold text-xl ">{user.email}</p>
          <p className="text-[#209bfb] font-semibold">{user.userName}</p>
        </div>
        <div>
          <label className="text-[#929191]">{calification}</label>
          <div className="flex  gap-3 items-center">
            <p className="text-base md:text-2xl font-semibold ">
              {user.qualification ?? 5}
            </p>
            <div className="flex space-x-1">
              {[...Array(user.qualification)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-base md:text-2xl">
                  <StarFill size="20" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex  gap-y-1 gap-x-10 items-center  flex-wrap md">
          <div className="flex items-center w-auto gap-2 rounded-lg px-2 py-2 hover:bg-gray-200 focus:outline-none cursor-pointer">
            <ChatLeftTextFill size="20" />
            <button onClick={HandleSetIsModalOpen}> {sendMsg}</button>
          </div>
          <div
            className="flex items-center w-auto px-2 rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
            style={{ background: primaryColor }}
          >
            <Check size="40" />
            <Btn text={follow} isPending={false} className="py-0" />
          </div>
          <button className="hover:bg-gray-100 rounded-lg p-2 text-gray-400">
            {reportUser}
          </button>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className=" flex gap-7 items-center">
          <div
            onClick={() => setStateBtn("Publications")}
            className={`flex  max-w-max pb-5 gap-2 max-h-max  border-b-4 ${
              stateBtn === "Publications"
                ? " border-[#209bfb]"
                : "border-transparent"
            } `}
          >
            <HousesFills size="23" />
            <button className="mt-1">{publications}</button>
          </div>
          <div
            onClick={() => setStateBtn("Favorites")}
            className={`flex items-center  max-w-max gap-2 max-h-max pb-5 border-b-4 ${
              stateBtn === "Favorites"
                ? "border-[#209bfb]"
                : "border-transparent"
            }`}
          >
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
