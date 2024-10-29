import { create } from "zustand";

type Language = "en" | "es" | "pt";

interface Translations {
  //auth
  titleAuth: string;
  //config
  titleConfig: string;
  languageConfig: string;
  language1Config: string;
  language2Config: string;
  language3Config: string;
}

const translations: { [key in Language]: Translations } = {
  en: {
    //auth
    titleAuth: "Sign In",
    //config
    titleConfig: "Configurations",
    languageConfig: "Language",
    language1Config: "Spanish",
    language2Config: "English",
    language3Config: "Portuguese",
  },
  es: {
    //auth
    titleAuth: "Iniciar sesión",
    //config
    titleConfig: "Configuraciones",
    languageConfig: "Idioma",
    language1Config: "Español",
    language2Config: "Inglés",
    language3Config: "Portugués",
  },
  pt: {
    //auth
    titleAuth: "Entrar",
    //config
    titleConfig: "Configurações",
    languageConfig: "Idioma",
    language1Config: "Espanhol",
    language2Config: "Inglês",
    language3Config: "Português",
  },
};

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  texts: Translations;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "es", // default language
  setLanguage: (language) =>
    set(() => ({
      language,
      texts: translations[language],
    })),
  texts: translations["es"], // default translations
}));
