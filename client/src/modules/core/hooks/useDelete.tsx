import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLanguageStore } from "../store/language";


type ParamsType = {
    service:(id: number) => Promise<any>
    refetch: () => void
};
export const useDelete = ({service, refetch}: ParamsType) => {
  const { language } = useLanguageStore();

  const { mutate: mutateToState } = useMutation({
    mutationFn: service,
    onSuccess: async (res) => {
      refetch();
      toast.success(res.message[language]);
    },
  });
  return {
    mutateToState
  };
};
