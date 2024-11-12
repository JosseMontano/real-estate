import { CustomerTable } from "../customerTable";
import { SumaryCard } from "../sumaryCards";

type ParamsType = {};
export const DashboardProduct = ({}: ParamsType) => {
  return (
    <div>
      <SumaryCard />
      <CustomerTable />
    </div>
  );
};
