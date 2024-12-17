import useAuthStore from "@/core/store/auth";
import { useLanguageStore } from "@/core/store/language";

type ParamsType = {};
export const HeaderDashboard = ({}: ParamsType) => {
  const { language } = useLanguageStore();
  const {user} = useAuthStore()
  return (
    <header className="flex mt-4">
      <h1 className="text-xl lg:text-2xl font-semibold">
        {language === "es" ? "Hola" : language === "en" ? "Hello" : "Olá"} {user.email}
        👋
      </h1>
    </header>
  );
};
