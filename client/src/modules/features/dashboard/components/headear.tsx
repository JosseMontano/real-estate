import { useLanguageStore } from "@/core/store/language";

type ParamsType = {};
export const HeaderDashboard = ({}: ParamsType) => {
  const { language } = useLanguageStore();
  return (
    <header className="mt-4 pl-16">
      <h1 className="text-xl lg:text-2xl font-semibold">
        {language === "es" ? "Hola" : language === "en" ? "Hello" : "Olá"} Evano
        👋
      </h1>
    </header>
  );
};
