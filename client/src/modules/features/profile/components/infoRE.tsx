import { Language } from "@/core/store/language";
import { RealEstate } from "@/shared/types/realEstate";

type ParamsType = {
    selectedRE: RealEstate | null;
    language: Language
}
export const InfoRE = ({selectedRE, language}:ParamsType) => {
    return (
        <div className="h-[250px] overflow-y-auto -m-5 py-2 px-5 flex flex-col gap-2">
        <p className="text-justify text-base font-bold text-gray-900">
          {selectedRE?.title[language]}
        </p>

        <p className="text-[15px] text-gray-600 ">
          {selectedRE?.description[language]}
        </p>

        <div>
          <p>
            <span className="text-[14px] text-gray-600 font-semibold">
              Direccion:{" "}
            </span>
            <span className="text-[14px] text-gray-600">
              {selectedRE?.address}
            </span>
          </p>
          <div className="flex gap-2 justify-evenly">
            <p>
              <span className="text-[13px] text-gray-600 font-semibold">
                Cantidad de baños:{" "}
              </span>
              <span className="text-[13px] text-gray-600">
                {" "}
                {selectedRE?.amount_bathroom}
              </span>
            </p>
            <p>
              <span className="text-[13px] text-gray-600 font-semibold">
                Cantidad de Cuartos:{" "}
              </span>
              <span className="text-[13px] text-gray-600">
                {selectedRE?.amount_bedroom}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
}