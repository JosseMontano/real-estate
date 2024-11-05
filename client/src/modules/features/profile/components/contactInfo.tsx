import { primaryColor } from "@/const/colors";
import Btn from "@/core/components/form/button";
import { User } from "@/core/types/user";

import { ChatLeftTextFill } from "@/shared/assets/icons/chatLeftTextFill";
import { Check } from "@/shared/assets/icons/check";
import { HeartFill } from "@/shared/assets/icons/heartFill";
import { HousesFills } from "@/shared/assets/icons/housesFills";
import { StarFill } from "@/shared/assets/icons/starFill";
import { useState } from "react";

type ParamsType = {
  user: User;
};
export const ContactInfo = ({ user }: ParamsType) => {
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
          <label className="text-[#929191]">CLASIFICACIÓN</label>
          <div className="flex  gap-3 items-center">
            <p className="text-2xl font-semibold ">{user.qualification}</p>
            <div className="flex space-x-1">
              {[...Array(user.qualification)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">
                  <StarFill size="20" />
                </span>
              ))}
              {[...Array(5 - Number(user.qualification))].map((i) => (
                <span key={i} className="text-gray-200 text-2xl">
                  <StarFill size="20" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-center">
          <div
            className="flex  w-auto py-1 pr-1 gap-2 rounded-lg  hover:bg-gray-200 focus:outline-none cursor-pointer"
          >
            <ChatLeftTextFill size="20" />
            <button> Enviar mensaje</button>
          </div>
          <div
            className="flex  w-auto px-2 rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
            style={{ background: primaryColor }}
          >
            <Check size="40" />
            <Btn text="Seguir" isPending={false} className="py-0" />
          </div>
          <button className="hover:bg-gray-200 rounded-lg p-2">Reportar usuario</button>
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
            <button>Publicaciones</button>
          </div>
          <div
            onClick={() => setStateBtn("Favorites")}
            className={`flex  max-w-max gap-2 max-h-max pb-5 border-b-4 ${
              stateBtn === "Favorites"
                ? "border-[#209bfb]"
                : "border-transparent"
            }`}
          >
            <HeartFill size="20" />
            <button>Favoritos</button>
          </div>
        </div>
        <div className="w-full h-px bg-gray-300"></div>
      </div>
    </div>
  );
};
