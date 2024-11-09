import { UsersIcon } from "@/shared/assets/icons/users";

type ParamsType = {};
export const SumaryCard = ({}: ParamsType) => {
  return (
    <div className="flex  mb-6 bg-white py-7 rounded-lg shadow h-auto w-full px-5 ">
      <div className="flex items-center basis-4/12 justify-center gap-4 flex-wrap border border-transparent border-r-gray-300">
        <div className="bg-[#deffed] rounded-full w-14 h-14 grid place-items-center">
          <UsersIcon size="20" />
        </div>
        <div>
          <h2 className="text-lg text-[#b8b8b8]">Total Customers</h2>
          <p className="text-2xl font-semibold">5,423</p>
        </div>
      </div>

      <div className="flex items-center basis-4/12 justify-center gap-4 flex-wrap border border-transparent border-r-gray-300">
        <div className="bg-[#deffed] rounded-full w-14 h-14 grid place-items-center">
          <UsersIcon size="20" />
        </div>
        <div>
          <h2 className="text-lg text-[#b8b8b8]">Members</h2>
          <p className="text-2xl font-semibold">1,893</p>
        </div>
      </div>

      <div className="flex items-center basis-4/12 justify-center gap-4 flex-wrap">
        <div className="bg-[#deffed] rounded-full w-14 h-14 grid place-items-center">
          <UsersIcon size="20" />
        </div>

        <div>
          <h2 className="text-lg text-[#b8b8b8]">Active Now</h2>
          <p className="text-2xl font-semibold">189</p>
        </div>
      </div>
    </div>
  );
};
