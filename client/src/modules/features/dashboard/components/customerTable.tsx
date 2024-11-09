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
    <div className="bg-white p-7 shadow border-4 border-[#2196eb] overflow-auto">
      <div className="flex  justify-between mb-4">
        <div className="flex flex-col  items-start">
          <h2 className="text-xl font-bold ">Todos los clientes</h2>
          <button className="text-[#ace9c7] font-bold">Clientes activos</button>
        </div>

        <div className="flex gap-5 md:items-center md:flex-row flex-col">
          <div className="flex items-center bg-[#dddee241] rounded-lg gap-3 px-4 h-10 ">
            <SearchIcon size="20" />
            <input
              type="text"
              placeholder="Buscar"
              className="bg-transparent focus:outline-none md:w-[200px] w-[100px]"
            ></input>
          </div>
          <div className="flex items-center bg-[#dddee241] rounded-lg gap-2 px-4 h-10 md:max-w-max">
            <p className="text-[#b8b8b8]">Filtrar por:</p>
            <select className="bg-transparent font-bold">
              <option> Nombre</option> <option> Compania</option>{" "}
              <option> Teléfono</option> <option> Email</option>{" "}
            </select>
          </div>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="flex gap-5">
          <tr className=" ">
            <th className="py-2 ">Customer Name</th>
            <th>Company</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Country</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stateBtn.map((customer, index) => (
            <tr key={index} className="border-t">
              <td className="py-2">{customer.name}</td>
              <td>{customer.company}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>{customer.country}</td>
              <td>
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
  );
};
