import { create } from "zustand";

export type Language = "en" | "es" | "pt";

export type TranslateRes = {
  es: string;
  en: string;
  pt: string;
};


interface Translations {
  //auth
  titleAuth: string;
  //config
  titleConfig: string;
  languageConfig: string;
  language1Config: string;
  language2Config: string;
  language3Config: string;
  //dashboard RE
  tableTile:string
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
    //dashboard RE
    tableTile: "Real Estates"
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
    //dashboard RE
    tableTile: "Bienes Raices"
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
    //dashboard RE  
    tableTile: "Imóveis"
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
