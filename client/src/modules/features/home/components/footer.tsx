import { FacebookIcon } from "@/shared/assets/icons/facebook";
import { InstagramIcon } from "@/shared/assets/icons/instagram";
import { YoutubeIcon } from "@/shared/assets/icons/youtube";

type ParamsType = {
  textFooter: string;
};
export const Footer = ({ textFooter }: ParamsType) => {
  return (
    <div
      id="socialMedia"
      className=" flex flex-col gap-3 items-center justify-center py-3 bg-gray-900 text-white"
    >
      <div className="flex gap-3">
        <FacebookIcon />
        <YoutubeIcon />
        <InstagramIcon />
      </div>
      <span className="text-sm text-center">{textFooter}</span>
    </div>
  );
};
