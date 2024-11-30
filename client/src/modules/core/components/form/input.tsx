import { primaryColor } from "@/core/constants/colors";
import { FieldError } from "react-hook-form";
import { useState } from "react";
import WarningIcon from "@/shared/assets/icons/warning";

type PostIconType = "left" | "right";
type ParamsType = {
  text: string;
  error?: FieldError | undefined;
  register?: any;
  type?: string;
  Icon?: React.FC<{ size: string; color: string }>;
  className?: string;
  smallInput?: boolean;
  positionIcon?: PostIconType;
  onClickIcon?: () => void;
};

export const Input = ({
  text,
  error,
  register,
  type = "text",
  Icon,
  className,
  smallInput = false,
  positionIcon = "left",
  onClickIcon
}: ParamsType) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  console.log(error);
  return (
    <>
      <div
        className={`bg-gray-100 border border-gray-300 rounded-lg  ${
          isFocused ? "border" : ""
        } ${className} ${smallInput ? "h-7" : ""}`}
        style={{
          borderColor: error ? "red" : isFocused ? primaryColor : "transparent",
        }}
      >
        <div className="flex items-center w-full relative">
          {Icon && positionIcon == "left" && (
            <div className={`p-2`}>
              <Icon size="20px" color={primaryColor} />
            </div>
          )}
          <input
            type={type}
            placeholder={text}
            className={`flex-1 bg-transparent w-full focus:outline-none px-2 py-2 ${
              smallInput ? "h-7" : ""
            }`}
            {...register}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
             {Icon && positionIcon == "right" && (
            <div className={`py-1 px-2 cursor-pointer`} onClick={onClickIcon}>
              <Icon size="18px" color={primaryColor} />
            </div>
          )}
          {error && (
            <WarningIcon
              size="20px"
              className="mr-[10px]  text-red-500"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            />
          )}
          {isTooltipVisible && (
            <div className="absolute bottom-full mb-2 w-max p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
              {(error as FieldError).message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
