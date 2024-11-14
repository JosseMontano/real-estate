import { UsersIcon } from "@/shared/assets/icons/users";

type ParamsType = {
  amountTotal: number;
  amountActive: number;
  amountInactive: number;
  isloading?: boolean;
};
export const SumaryCard = ({
  amountActive,
  amountInactive,
  amountTotal,
  isloading,
}: ParamsType) => {
  return (
    <>
      {isloading && <p>cargando</p>}

      {!isloading && (
        <div className="flex  mb-6 bg-white md:py-7 py-3 rounded-lg shadow h-auto w-full md:px-5 px-2">
          <div className="flex  basis-4/12 justify-center gap-4 flex-wrap  border border-transparent border-r-gray-300  items-center md:p-0 p-1">
            <div className="bg-[#deffed] rounded-full w-14 h-14 grid place-items-center">
              <UsersIcon size="20" />
            </div>
            <div>
              <h2 className="text-lg text-[#b8b8b8] text-center">Total</h2>
              <p className="text-2xl font-semibold text-center md:text-start">
                {amountTotal}
              </p>
            </div>
          </div>

          <div className="flex items-center basis-4/12 justify-center gap-4 flex-wrap border border-transparent border-r-gray-300 md:p-0 p-1">
            <div className="bg-[#deffed] rounded-full w-14 h-14 grid place-items-center">
              <UsersIcon size="20" />
            </div>
            <div>
              <h2 className="text-lg text-[#b8b8b8] text-center">Activos</h2>
              <p className="text-2xl font-semibold md:text-start text-center">
                {amountActive}
              </p>
            </div>
          </div>

          <div className="flex items-center basis-4/12 justify-center gap-4 flex-wrap md:p-0 ">
            <div className="bg-[#deffed] rounded-full w-14 h-14 grid place-items-center">
              <UsersIcon size="20" />
            </div>

            <div>
              <h2 className="text-lg text-[#b8b8b8] text-center">Inactivos</h2>
              <p className="text-2xl font-semibold md:text-start text-center">
                {amountInactive}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
