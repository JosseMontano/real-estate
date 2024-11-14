import { useLanguageStore } from "@/core/store/language";
import { SearchIcon } from "@/shared/assets/icons/search";

type ParamsType = {
  data: any[];
  header: string[];
  handleState: (id: number) => void;
};
export const CustomerTable = ({ data, header, handleState }: ParamsType) => {
  const { language } = useLanguageStore();
  return (
    <div className="bg-white p-3 md:p-7 shadow border-4 border-[#2196eb] overflow-auto">
      <div className="flex  justify-between mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-lg md:text-xl font-bold ">Todos los clientes</h2>
          <button className="text-[#ace9c7] font-bold text-sm md:text-base text-start">
            Clientes activos
          </button>
        </div>

        <div className="flex gap-5 md:items-center md:flex-row flex-col">
          <div className="flex items-center bg-[#dddee241] rounded-lg gap-3 px-4 h-10 md:w-[200px] w-[150px]">
            <SearchIcon size="20" />
            <input
              type="text"
              placeholder="Buscar"
              className="bg-transparent focus:outline-none w-full"
            />
          </div>
          <div className="flex md:items-center bg-[#dddee241] rounded-lg gap-2 px-2 md:px-3 py-1 md:w-[200px] w-[150px] md:flex-row flex-col ">
            <p className="text-[#b8b8b8] md:text-base text-xm leading-none md:leading-none">
              Filtrar por:
            </p>
            <select className="bg-transparent font-bold w-full text-sm md:text-base flex flex-wrap">
              <option> Nombre</option> <option> Compania</option>{" "}
              <option> Teléfono</option> <option> Email</option>{" "}
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              {header.map((v) => (
                <th key={v} className="pl-10 md:pl-0 max-w-xs break-words">
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((v, index) => (
              <tr key={index} className="border-t">
                {header.map((col) => (
                  <>
                    {col != "active" && (
                      <td
                        key={col}
                        className="pl-10 md:pl-0 max-w-xs break-words"
                      >
                        {typeof v[col as keyof typeof v] === "object" &&
                        v[col as keyof typeof v] !== null
                          ? v[col as keyof typeof v]?.[language] // Access "language" if it's an object
                          : String(v[col as keyof typeof v])}
                      </td>
                    )}

                    {col == "active" && (
                      <td className="pl-10 md:pl-0 max-w-xs break-words">
                        <span
                          onClick={() => handleState(v.id)}
                          className={`px-2 py-1 rounded-lg ${
                            v[col as keyof typeof v]
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          } cursor-pointer`}
                        >
                          {v[col as keyof typeof v] ? "active" : "Inactive"}
                        </span>
                      </td>
                    )}
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
