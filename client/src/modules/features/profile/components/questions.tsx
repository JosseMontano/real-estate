import { HeadingIcon } from "@/shared/assets/icons/heading";
import { UserIcon } from "@/shared/assets/icons/user";
import { FormResponse } from "./formResponse";
import useGet from "@/core/hooks/useGet";
import { RealEstate } from "@/shared/types/realEstate";
import {
  fetchGetAllResponsesByREId,
  fetchUnasweredQuestions,
} from "../api/endpoints";

import { User } from "@/core/types/user";
import { Language, Translations } from "@/core/store/language";
import { Empty } from "@/core/components/map/empty";

type ParamsType = {
  selectedRE: RealEstate | null;
  texts: Translations;
  language: Language;
  userLogged: User;
  user: User;
};
export const Questions = ({
  selectedRE,
  texts,
  language,
  user,
  userLogged,
}: ParamsType) => {
  const { data: unasweredQuestions, isLoading } = useGet({
    queryKey: ["questions-by-re", selectedRE?.id],
    services: () => fetchUnasweredQuestions(selectedRE?.id ?? 0),
    valueToService: selectedRE?.id,
  });

  const { data: allResponses, isLoading: isLoadingAllResponses } = useGet({
    queryKey: ["all-response-by-re", selectedRE?.id],
    services: () => fetchGetAllResponsesByREId(selectedRE?.id ?? 0),
    valueToService: selectedRE?.id,
  });
  
  return (
    <div className="h-[250px] -m-5 py-2 px-5 overflow-y-auto flex flex-wrap gap-[7px]">
      {user == userLogged && (
        <>
          {!isLoading && (
             <div className="w-full">
             <Empty data={unasweredQuestions ?? []} />
           </div> 
            )}

          {unasweredQuestions?.map((question, i) => (
            <div
              className={`w-[49%] rounded-md h-[180px] shadow-2xl p-3 border-t-4 border-t-primary flex flex-col gap-1`}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-[550]">
                  {texts.questionTitlteVisitUser} {i + 1}
                </h4>
                <HeadingIcon size={16} />
              </div>

              <p className="text-[13px]">{question.question[language]}</p>

              <div className="flex gap-1 items-center  ">
                <div className="bg-gray-200 p-[2px] rounded-full">
                  <UserIcon size="16" />
                </div>

                <span className="text-[13px]">{texts.anonymousVisitUser}</span>
              </div>

              <FormResponse
                questionId={question.id}
                realEstateId={selectedRE?.id ?? 0}
                language={language}
                selectedRE={selectedRE}
              />
            </div>
          ))}
        </>
      )}

      {user != userLogged && (
        <>
          {!isLoadingAllResponses && (
            <div className="w-full">
              <Empty data={allResponses ?? []} />
            </div>
          )}

          {allResponses?.map((v, i) => (
            <div
              className={`w-[49%] rounded-md h-[180px] shadow-2xl p-3 border-t-4 border-t-primary flex flex-col gap-1`}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-[550]">
                  {texts.questionTitlteVisitUser} {i + 1}
                </h4>
                <HeadingIcon size={16} />
              </div>
              <p className="text-[13px]">{v.question.question[language]}</p>
              <div className="flex gap-1 items-center  ">
                <div className="bg-gray-200 p-[2px] rounded-full">
                  <UserIcon size="16" />
                </div>

                <span className="text-[13px]">{texts.anonymousVisitUser}</span>
              </div>
              R. {v.response[language]}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
