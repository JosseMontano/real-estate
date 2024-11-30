import { HeadingIcon } from "@/shared/assets/icons/heading";
import { UserIcon } from "@/shared/assets/icons/user";
import { FormResponse } from "./formResponse";
import useGet from "@/core/hooks/useGet";
import { RealEstate } from "@/shared/types/realEstate";
import { fetchUnasweredQuestions } from "../api/endpoints";

type ParamsType = {
  selectedRE: RealEstate | null;
};
export const Questions = ({ selectedRE }: ParamsType) => {
  const { data: unasweredQuestions } = useGet({
    queryKey: ["questions-by-re", selectedRE?.id],
    services: () => fetchUnasweredQuestions(selectedRE?.id ?? 0),
    valueToService: selectedRE?.id,
  });

  return (
    <div className="h-[250px] -m-5 py-2 px-5 overflow-y-auto flex flex-wrap gap-[7px]">
      {unasweredQuestions?.map((question) => (
        <div
          className={`w-[49%] rounded-md h-[180px] shadow-2xl p-3 border-t-4 border-t-primary flex flex-col gap-1`}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-[550]">Pregunta 1</h4>
            <HeadingIcon size={16} />
          </div>

          <p className="text-[13px]">Aceptan mascotas?</p>

          <div className="flex gap-1 items-center  ">
            <div className="bg-gray-200 p-[2px] rounded-full">
              <UserIcon size="16" />
            </div>

            <span className="text-[13px]">Anonimo</span>
          </div>
          <FormResponse
            questionId={question.id}
            realEstateId={selectedRE?.id ?? 0}
          />
        </div>
      ))}
    </div>
  );
};
