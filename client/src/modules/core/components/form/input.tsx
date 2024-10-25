import { primaryColor } from "@/const/colors";
import { FieldError } from "react-hook-form";

type ParamsType = {
  text: string;
  error: FieldError | undefined;
  register: any;
  type?: string;
  className?: string | undefined;
  Icon?: React.FC<{ size: string; color: string }>;
};
export const Input = ({
  text,
  error,
  register,
  type = "text",
  className,
  Icon,
}: ParamsType) => {
  return (
    <div>
      <div className="flex items-center  w-full">
        {Icon && (
          <div className="p-2">
            <Icon size="20px" color={primaryColor} />
          </div>
        )}
        <input
          className={`flex-1 ${className}  `} // Dejar que el input tome todo el espacio restante
          type={type}
          placeholder={text}
          {...register}
        />
      </div>
      {error && <p className="text-red-500">{(error as FieldError).message}</p>}
    </div>
  );
};
