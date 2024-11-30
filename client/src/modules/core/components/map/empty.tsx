import { useLanguageStore } from "@/core/store/language";
import EmptyImg from "@/shared/assets/empty.png";
type ParamsType = {
  data: any[];
};
export const Empty = ({ data }: ParamsType) => {
  const { texts } = useLanguageStore();
  return (
    <>
      {data.length === 0 && (
        <div className="flex flex-col items-center">
          <img src={EmptyImg} alt="vacio" />
          <p>{texts.empty}</p>
        </div>
      )}
    </>
  );
};
