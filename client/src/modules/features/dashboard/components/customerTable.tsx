import React, { useState } from "react";
import { primaryColor } from "@/core/const/colors";
import Btn from "@/core/components/form/button";
import Pagination from "@/core/components/form/pagination";
import { useLanguageStore } from "@/core/store/language";
import { SearchIcon } from "@/shared/assets/icons/search";
import Select from "@/core/components/form/select";

type ParamsType = {
  data: any[];
  selectData?: any[];
  currentSelected?: any;
  header: string[];
  handleState: (id: number) => void;
  amountOfPages: number;
  currentPage: number;
  handlePagination: (page: number) => void;
  isloading: boolean;
  setIsOpenModal?: () => void;
  setCurrentSelected?: (val: any) => void;
  tableTitle: string;
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
}: ParamsType) => {
  const { language } = useLanguageStore();
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((row) =>
    header.some((col) => {
      const cellValue = row[col as keyof typeof row];
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

  return (
    <>
      {isloading && <p>cargando</p>}
      {!isloading && (
        <div className="bg-white p-3 md:p-7 shadow overflow-auto">
          <div className="flex justify-between mb-4 md:flex-row sm:flex-row flex-col gap-2">
            <div className="flex items-start gap-8">
              <div className="flex flex-col">
                <h2 className="text-lg md:text-xl font-bold ">
      {tableTitle}
                </h2>
                <button className="text-[#ace9c7] font-bold text-sm md:text-base text-start">
                  Clientes activos
                </button>
              </div>
              {setIsOpenModal && (
                <div className="">
                  <Btn
                    isPending={false}
                    text="Agregar"
                    className="max-w-max p-2"
                    onClick={setIsOpenModal}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2 md:gap-5 md:items-center md:flex-row flex-col">
              <div className="flex items-center bg-[#dddee241] rounded-lg gap-3 px-4 md:h-10 h-12 md:w-[200px] w-[200px]">
                <SearchIcon size="20" />
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchText} 
                  onChange={(e) => setSearchText(e.target.value)}
                  className="bg-transparent focus:outline-none w-full"
                />
              </div>
              {selectData && (
                <div className="flex md:items-center bg-[#dddee241] rounded-lg gap-2 px-2 md:px-3 py-1 md:w-[200px] w-[200px] md:flex-row flex-col md:h-10 h-auto">
                  <p className="text-[#b8b8b8] md:text-base text-xm leading-none md:leading-none whitespace-nowrap">
                    Filtrar por:
                  </p>

                  <Select
                    value={
                      currentSelected.name != undefined
                        ? currentSelected.name[language]
                        : undefined
                    }
                    onChange={(val) => {
                      if (setCurrentSelected) setCurrentSelected(val);
                    }}
                    options={selectData?.map((v) => ({
                      name: v.name,
                      id: v.id,
                    }))}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  {header.map((v) => (
                    <th
                      key={v}
                      className="pl-10 md:pl-0 max-w-xs break-words text-gray-300"
                    >
                      {v}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((v, index) => (
                  <tr key={index} className="border-t">
                    {header.map((col) => (
                      <>
                        {col != "active" && (
                          <td
                            key={col}
                            className="pl-10 md:pl-0 max-w-[130px] min-w-[130px] md:max-w-[90px] md:min-w-[90px] break-words pt-10"
                          >
                            {typeof v[col as keyof typeof v] === "object" &&
                            v[col as keyof typeof v] !== null
                              ? v[col as keyof typeof v]?.[language] // Access "language" if it's an object
                              : String(v[col as keyof typeof v])}
                          </td>
                        )}

                        {col == "active" && (
                          <td className="pl-10 md:pl-0 max-w-[130px] min-w-[130px] md:max-w-[90px] md:min-w-[90px] break-words">
                            <span
                              onClick={() => {
                                handleState(v.id);
                              }}
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

            <Pagination
              amountOfPages={amountOfPages}
              currentPage={currentPage}
              primaryColor={primaryColor}
              handlePagination={handlePagination}
              lastPage={amountOfPages}
            />
          </div>
        </div>
      )}
    </>
  );
};
