import { RealEstate } from "@/shared/types/realEstate";

import { Language } from "@/core/store/language";
import { StateBtnType } from "./buttons";

type ParamsType = {
  index: number;
  item: RealEstate;
  states: StateBtnType[];
  language: Language;
};
export const Info = ({ index, item, language, states }: ParamsType) => {
  return (
    <>
      {states[index] === "info" && (
        <>
          <h1 className={`w-[350px] ${
            index % 2 === 1 ? "text-end" : "text-start"
          }  text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 max-w-xs md:max-w-md lg:max-w-lg`}>
            {item.title[language]}
          </h1>
          <div className="">
            <p
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 4,
                lineClamp: 4,
              }}
              className="w-[450px] text-base leading-[30px]  text-gray-600 max-w-xs md:max-w-md lg:max-w-lg text-justify"
            >
              {item.description[language]}
            </p>
          </div>
        </>
      )}
    </>
  );
};
