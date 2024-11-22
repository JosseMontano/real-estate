import { primaryColor } from "@/core/const/colors";

type ParamsType = {};
export const FormAuthFooter = ({}: ParamsType) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center text-gray-600">
          <input
            type="checkbox"
            className="ml-2 h-5 w-5 appearance-none border border-gray-400 border-solid rounded-full focus:outline-none cursor-pointer"
            onChange={(e) =>
              e.target.checked
                ? ((e.target.style.background = primaryColor),
                  (e.target.style.border = "transparent"))
                : ((e.target.style.background = "transparent"),
                  (e.target.style.border = "1px solid"))
            }
          />
          <span className="ml-2">Mantener conectado</span>
        </label>
      </div>
    </>
  );
};
