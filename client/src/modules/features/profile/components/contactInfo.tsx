import { primaryColor } from "@/const/colors";
import Btn from "@/core/components/form/button";
import { User } from "@/core/types/user";

import { ChatLeftTextFill } from "@/shared/assets/icons/chatLeftTextFill";
import { Check } from "@/shared/assets/icons/check";
import { HeartFill } from "@/shared/assets/icons/heartFill";
import { HousesFills } from "@/shared/assets/icons/housesFills";
import { StarFill } from "@/shared/assets/icons/starFill";

type ParamsType = {
  user: User;
};
export const ContactInfo = ({ user }: ParamsType) => {
  console.log(5 - Number(user.qualification));
  return (
    <div className="mt-6 flex flex-col gap-2">
      <label className="font-bold">Correo</label>
      <p>{user.email}</p>
      <label className="font-bold">Nombre de usuario</label>
      <p>{user.userName}</p>
      <label className="font-bold">Clasificación</label>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold mx-1">{user.qualification}</p>
        <div className="flex space-x-1">
          {/* Estrellas de calificación */}
          {[...Array(user.qualification)].map((_, i) => (
            <span key={i} className="text-yellow-400 text-2xl">
              <StarFill size="20" />
            </span>
          ))}
          {[...Array(5 - Number(user.qualification))].map((i)=>(
            <span key={i} className="text-gray-400 text-2xl">
            <StarFill size="20" />
          </span> 
          ))}
          
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div
          className="flex  w-auto px-2 py-1 gap-2 rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
          style={{ background: primaryColor }}
        >
          <ChatLeftTextFill size="20" />
          <Btn text="Enviar mensaje" isPending={false} className="py-0 " />
        </div>
        <div
          className="flex  w-auto px-2 rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
          style={{ background: primaryColor }}
        >
          <Check size="40" />
          <Btn text="Seguir" isPending={false} className="py-0" />
        </div>
        <Btn
          text="Reportat usuario"
          isPending={false}
          className="max-w-max p-5 rounded-lg"
        />
      </div>

      <div className="flex gap-7 items-center">
        <div
          className="flex  max-w-max p-1 gap-2 rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
          style={{ background: primaryColor }}
        >
          <HousesFills size="28" />
          <Btn text="Publicaciones" isPending={false} className="py-0 " />
        </div>
        <div
          className="flex  max-w-max px-1 pb-1 gap-2 rounded-lg hover:opacity-90 focus:outline-none cursor-pointer"
          style={{ background: primaryColor }}
        >
          <HeartFill size="28" />
          <Btn text="Favoritos" isPending={false} className="py-0 " />
        </div>
      </div>
    </div>
  );
};
