import { FacebookIcon } from "@/shared/assets/icons/facebook";
import { InstagramIcon } from "@/shared/assets/icons/instagram";
import { YoutubeIcon } from "@/shared/assets/icons/youtube";

type ParamsType = {};
export const Footer = ({}: ParamsType) => {
  return (
    <div className=" flex flex-col gap-3 items-center justify-center py-3">
      <div className="flex gap-3">
        <FacebookIcon />
        <YoutubeIcon />
        <InstagramIcon />
      </div>
      <span className="text-sm">
        Copyright © INMUEBLES EN LA NUBE - Todos los derechos reservados
      </span>
    </div>
  );
};
