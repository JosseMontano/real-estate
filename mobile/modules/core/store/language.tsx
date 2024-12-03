import { create } from "zustand";

export type Language = "en" | "es" | "pt";

export type TranslateRes = {
  es: string;
  en: string;
  pt: string;
};

export interface Translations {
  //shared
  titleConfig: string;
  titleModalConfig:string;
  spanishConfig:string
  englishConfig:string
  portugueseConfig:string 
  //auth
  title: string;
  subTitle: string;
}

const translations: { [key in Language]: Translations } = {
  en: {
      //shared
    titleConfig: "Language",
    titleModalConfig:"Configuration",
    spanishConfig:"Spanish",
    englishConfig:"English",
    portugueseConfig:"Portuguese",
     //auth
    title: "Welcome to InmoApp",
    subTitle: "Enjoy life in your dream home",
  },
  es: {
      //shared
    titleConfig: "Idioma",
    titleModalConfig:"Configuracion",
    spanishConfig:"Español",
    englishConfig:"Inglés",
    portugueseConfig:"Portugués",
     //auth
    title: "Bienvenido a InmoApp",
    subTitle: "Disfruta la vida en tu casa soñada",
  },
  pt: {
      //shared
    titleConfig: "linguagem",
    titleModalConfig:"configuração",
    spanishConfig:"Espanhol",
    englishConfig:"Inglês",
    portugueseConfig:"Português",
     //auth
    title: "Bem-vindo ao InmoApp",
    subTitle: "Disfruta la vida en tu casa soñada",
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
  texts: translations["es"],
}));
