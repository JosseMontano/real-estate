import { primaryColor } from "@/const/colors";

type ParamsType = {};
export const SearchPropierties = ({}: ParamsType) => {
  return (
    <section className="container absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-7xl mx-auto bg-white shadow-md flex">
      <div className="bg-white p-2 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
        <div className="flex-1">
          <label>Ingresa alguna palabra</label>
          <input
            type="text"
            className={`w-full border border-gray-300  rounded px-4 py-[5px] my-3 focus:outline-none focus:ring-2`}
            placeholder="3 dormitorios"
          />
        </div>
        <div className="flex-1">
          <label>Tipo de propiedad</label>
          <select className="w-full border-gray-300 rounded px-4 py-2 my-3 ">
            <option>Residencial</option>
            <option>Soltero</option>
            <option>Commercial</option>
            <option>Casado</option>
            <option>Viudo</option>
          </select>
        </div>
        <div className="flex-1">
          <label>Ubicación</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2 my-3 ">
            <option>Queru queru</option>
            <option>Cala cala</option>
            <option>Prado</option>
            <option>Bulevar</option>
          </select>
        </div>
        <div className="flex-1">
          <label>Limites de precio</label>
          <select className="w-full border border-gray-300 rounded px-4 py-2 my-3 ">
            <option>1000Bs</option>
            <option>1500Bs</option>
            <option>2000Bs</option>
            <option>2500Bs</option>
          </select>
        </div>
      </div>
      <div className="flex end-0">
        <button
          className="text-white px-10 py-2 "
          style={{ background: primaryColor }}
        >
          Search
        </button>
      </div>
    </section>
  );
};
