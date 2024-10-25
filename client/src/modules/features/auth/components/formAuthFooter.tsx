import { primaryColor } from "@/const/colors";
import { GoogleIcon } from "@/shared/assets/icons/google";

type ParamsType = {};
export const FormAuthFooter = ({}: ParamsType) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center text-gray-600">
          <input type="checkbox" className="form-checkbox" />
          <span className="ml-2">Mantener conectado</span>
        </label>
      </div>
      <button
        type="submit"
        style={{ background: primaryColor }}
        className={`w-full text-white py-2 rounded hover:opacity-90 focus:outline-none focus:ring-2`}
      >
        Login
      </button>
      <p className="text-center text-sm text-gray-500 mt-4">
        ¿Sin cuenta? <span>Ingresa tus datos y listo</span>
      </p>
      <div className="mt-6">
        <p className="text-center text-sm text-gray-500 mb-4">O inicia con:</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-200 p-3 rounded-full">
            <GoogleIcon size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
