import { primaryColor } from "@/const/colors";
import { FieldError } from "react-hook-form";
import { useState } from "react";

type ParamsType = {
  text: string;
  error: FieldError | undefined;
  register: any;
  type?: string;
  Icon?: React.FC<{ size: string; color: string }>;
};

export const Input = ({
  text,
  error,
  register,
  type = "text",
  Icon,
}: ParamsType) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div
        className={`bg-gray-100 border border-gray-300 rounded-lg ${
          isFocused ? "border" : ""
        }`}
        style={{ borderColor: isFocused ? primaryColor : "transparent" }}
      >
        <div className="flex items-center w-full">
          {Icon && (
            <div className="p-2">
              <Icon size="20px" color={primaryColor} />
            </div>
          )}
          <input
            type={type}
            placeholder={text}
            className="flex-1 bg-transparent w-full focus:outline-none px-2 py-2"
            {...register}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
      {error && <p className="text-red-500">{(error as FieldError).message}</p>}
    </>
  );
};
