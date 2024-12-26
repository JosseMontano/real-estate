import { useEffect, useState } from "react";
import { primaryColor } from "@/core/constants/colors";

import Pagination from "@/core/components/form/pagination";
import { useLanguageStore } from "@/core/store/language";
import { SearchIcon } from "@/shared/assets/icons/search";
import Select from "@/core/components/form/select";
import { Empty } from "@/core/components/map/empty";
import { header } from "@/core/hooks/useDash";


type ParamsType = {
  data: any[];
  fullData: any[];
  selectData?: any[];
  propSelectData?: string;
  currentSelected?: any;
  header: header[];
  handleState: (id: number) => void;
  amountOfPages: number;
  currentPage: number;
  handlePagination: (page: number) => void;
  isloading: boolean;
  setIsOpenModal?: () => void;
  setCurrentSelected?: (val: any) => void;
  tableTitle: string;
  handleGetReByType?: (id: number) => void;
};

export const CustomerTable = ({
  data,
  header,
  handleState,
  amountOfPages,
  currentPage,
  handlePagination,
  isloading,
  setIsOpenModal,
  selectData,
  currentSelected,
  setCurrentSelected,
  tableTitle,
  handleGetReByType,
  propSelectData,
  fullData,
}: ParamsType) => {
  const { language } = useLanguageStore();
  const [searchText, setSearchText] = useState("");

  const filteredData = (searchText != "" ? fullData : data).filter((row) =>
    header.some((col) => {
      const cellValue = row[col.key as keyof typeof row];
      if (typeof cellValue === "object" && cellValue !== null) {
        return String(cellValue[language] || "")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      }
      return String(cellValue || "")
        .toLowerCase()
        .includes(searchText.toLowerCase());
    })
  );

  useEffect(() => {
    if (handleGetReByType) {
      if (currentSelected.id) {
        handleGetReByType(currentSelected.id);
        console.log(currentSelected.id);
      }
    }
  }, [currentSelected]);

  return (
    <>
      {!isloading && (
        <div className="bg-white p-3 md:p-7 shadow h-full flex flex-col">
          {/* Cabecera fija */}
          <div className="flex justify-between mb-4 md:flex-row sm:flex-row flex-col gap-2  top-0 z-8 ">
            <div className="flex items-start gap-8">
              <div className="flex flex-col">
                <h2 className="text-lg md:text-xl font-bold">{tableTitle}</h2>
                <div className="flex gap-3">
                  <button className="text-[#ace9c7] font-bold text-sm md:text-base text-start">
                    {language === "es"
                      ? "Disponibles"
                      : language === "en"
                      ? "Available"
                      : "Disponíveis"}
                  </button>
                  {setIsOpenModal && (
                    <div>
                      <button
                        onClick={setIsOpenModal}
                        className="text-[#ace9c7] font-bold text-sm md:text-base text-start"
                      >
                        {language === "es"
                          ? "Agregar"
                          : language === "en"
                          ? "Add"
                          : "Adicionar"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 md:gap-5 md:items-center md:flex-row flex-col">
              <div className="flex items-center bg-[#dddee241] rounded-lg gap-3 px-4 md:h-10 h-12 md:w-[200px] w-[200px]">
                <SearchIcon size="20" />
                <input
                  type="text"
                  placeholder={
                    language === "es" || language === "pt" ? "Buscar" : "Search"
                  }
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-transparent focus:outline-none w-full"
                />
              </div>
              {selectData && (
                <div className="flex md:items-center bg-[#dddee241] rounded-lg gap-2 px-2 md:px-3 py-1 md:w-[230px] w-[230px] md:flex-row flex-col md:h-10 h-auto">
                  <p className="text-[#b8b8b8] md:text-base text-xm leading-none md:leading-none whitespace-nowrap">
                    {language === "en" ? "Filter by:" : "Filtrar por:"}
                  </p>
                  <Select
                    value={
                      currentSelected.name != undefined
                        ? currentSelected.name[language]
                        : undefined
                    }
                    onChange={(val) => {
                      if (setCurrentSelected) {
                        setCurrentSelected(val);
                      }
                    }}
                    options={selectData?.map((v) => ({
                      name: v[propSelectData as keyof typeof v],
                      id: v.id, // Siempre incluir el ID
                    }))}
                    className="border-none shadow-none bg-opacity-0 rounded-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-hidden flex-grow max-h-[640px] ">

            <Empty data={filteredData} />

            {filteredData.length > 0 && (
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr>
                    {header.map((v) => (
                      <th
                        key={v.key}
                        className="pl-10 md:pl-10 px-10 w-auto break-words text-gray-300 text-center"
                      >
                        {v.val}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((v, index) => (
                    <tr key={index} className="border-t">
                      {header.map((col) => (
                        <>
                          {col.key != "active" && (
                            <td
                              key={col.key}
                              className="pl-10 md:pl-0 max-w-[130px] min-w-[130px] md:max-w-max  break-words py-2 text-balance text-center"
                            >
                              {typeof v[col.key as keyof typeof v] === "object" &&
                              v[col.key as keyof typeof v] !== null
                                ? v[col.key as keyof typeof v]?.[language] // Access "language" if it's an object
                                : String(v[col.key as keyof typeof v])}
                            </td>
                          )}
                          {col.key == "active" && (
                            <td className="pl-10 md:pl-0 max-w-[130px] min-w-[130px] md:max-w-[90px] md:min-w-[90px] break-words py-2 text-center">
                              <span
                                onClick={() => {
                                  handleState(v.id);
                                }}
                                className={`px-2 py-1 rounded-lg ${
                                  v[col.key as keyof typeof v]
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                } cursor-pointer`}
                              >
                                {v[col.key as keyof typeof v]
                                  ? "active"
                                  : "Inactive"}
                              </span>
                            </td>
                          )}
                        </>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {searchText == "" && filteredData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              primaryColor={primaryColor}
              handlePagination={handlePagination}
              lastPage={amountOfPages}
            />
          )}
        </div>
      )}
    </>
  );
};
