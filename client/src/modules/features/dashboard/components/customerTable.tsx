import CustomSelect, { Option } from "@/core/components/form/select";
import { SearchIcon } from "@/shared/assets/icons/search";
import { useState } from "react";

type ParamsType = {};
export const CustomerTable = ({}: ParamsType) => {
  const customers = [
    {
      name: "Jane Cooper",
      company: "Microsoft",
      phone: "(225) 555-0118",
      email: "jane@microsoft.com",
      country: "United States",
      status: true,
    },
    {
      name: "Floyd Miles",
      company: "Yahoo",
      phone: "(205) 555-0100",
      email: "floyd@yahoo.com",
      country: "Kiribati",
      status: false,
    },
    {
      name: "Ronald Richards",
      company: "Adobe",
      phone: "(302) 555-0107",
      email: "ronald@adobe.com",
      country: "Israel",
      status: false,
    },
  ];
  const optionsSelect: Option[] = [
    { value: "Nombre", id: "Nombre" },
    { value: "Compania", id: "Compania" },
    { value: "Telefono", id: "Telefono" },
    { value: "Email", id: "Email" },
  ];
  const [valueSelect, setValueSelect] = useState<string>("");
  const handleOnChangeSelect = (val: string) => {
    setValueSelect(val);
  };
  const [stateBtn, setStateBtn] = useState(customers);
  const handleChangeBtn = (index: number) => {
    setStateBtn((prev) =>
      prev.map((data, i) =>
        i === index
          ? {
              ...data,
              status: data.status === true ? false : true,
            }
          : data
      )
    );
  };

  return (
    <div className="bg-white p-3 md:p-7 shadow border-4 border-[#2196eb] overflow-auto">
      <div className="flex  justify-between mb-4 md:flex-row sm:flex-row flex-col gap-2">
        <div className="flex flex-col items-start">
          <h2 className="text-lg md:text-xl font-bold ">Todos los clientes</h2>
          <button className="text-[#ace9c7] font-bold text-sm md:text-base text-start">
            Clientes activos
          </button>
        </div>

        <div className="flex gap-2 md:gap-5 md:items-center flex-row ">
          <div className="flex items-center bg-[#dddee241] rounded-lg gap-3 px-4 md:h-10 h-12 md:w-[200px] w-[200px]">
            <SearchIcon size="20" />
            <input
              type="text"
              placeholder="Buscar"
              className="bg-transparent focus:outline-none w-full"
            />
          </div>
          <div className="flex md:items-center bg-[#dddee241] rounded-lg gap-2 px-2 md:px-3 py-1 md:w-[200px] w-[200px] md:flex-row flex-col md:h-10 h-auto">
            <p className="text-[#b8b8b8] md:text-base text-xm leading-none md:leading-none whitespace-nowrap">
              Filtrar por:
            </p>
            <CustomSelect
              value={valueSelect}
              onChange={handleOnChangeSelect}
              options={optionsSelect}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="py-2 max-w-xs break-words text-gray-300">
                Customer Name
              </th>
              <th className="pl-10 md:pl-0 max-w-xs break-words text-gray-300">
                Company
              </th>
              <th className="pl-10 md:pl-0 max-w-xs break-words text-gray-300">
                Phone Number
              </th>
              <th className="pl-10 md:pl-0 max-w-xs break-words text-gray-300">
                Email
              </th>
              <th className="pl-10 md:pl-0 max-w-xs break-words text-gray-300">
                Country
              </th>
              <th className="pl-10 md:pl-0  max-w-xs break-words text-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {stateBtn.map((customer, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 max-w-xs break-words">{customer.name}</td>
                <td className="pl-10 md:pl-0 max-w-xs break-words">
                  {customer.company}
                </td>
                <td className="pl-10 md:pl-0 max-w-xs break-words">
                  {customer.phone}
                </td>
                <td className="pl-10 md:pl-0 max-w-xs break-words">
                  {customer.email}
                </td>
                <td className="pl-10 md:pl-0 max-w-xs break-words">
                  {customer.country}
                </td>
                <td className="pl-10 md:pl-0 max-w-[130px] min-w-[130px] md:max-w-[90px] md:min-w-[90px] break-words">
                  <span
                    onClick={() => handleChangeBtn(index)}
                    className={`px-2 py-1 rounded-lg ${
                      customer.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } cursor-pointer`}
                  >
                    {customer.status ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
