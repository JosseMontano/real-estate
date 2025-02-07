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
  titleModalConfig: string;
  spanishConfig: string;
  englishConfig: string;
  portugueseConfig: string;
  sucess: string;
  //auth
  title: string;
  subTitle: string;
  //homePage
  typeText: string;
  btnInfo:string
  btnPlaces:string
}

const translations: { [key in Language]: Translations } = {
  en: {
    //shared
    titleConfig: "Language",
    titleModalConfig: "Configuration",
    spanishConfig: "Spanish",
    englishConfig: "English",
    portugueseConfig: "Portuguese",
    sucess: "Success",
    //auth
    title: "Sign in",
    subTitle: "Enjoy life in your dream home",
    //homePage
    typeText: "Type",
    btnInfo:"Information",
    btnPlaces:"Places",
  },
  es: {
    //shared
    titleConfig: "Idioma",
    titleModalConfig: "Configuracion",
    spanishConfig: "Español",
    englishConfig: "Inglés",
    portugueseConfig: "Portugués",
    sucess: "Exitoso",
    //auth
    title: "Iniciar sesion",
    subTitle: "Disfruta la vida en tu casa soñada",
      //homePage
    typeText: "Tipo",
    btnInfo:"Informacion",
    btnPlaces:"Lugares",
  },
  pt: {
    //shared
    titleConfig: "linguagem",
    titleModalConfig: "configuração",
    spanishConfig: "Espanhol",
    englishConfig: "Inglês",
    portugueseConfig: "Português",
    sucess: "bem-sucedido",
    //auth
    title: "Entrar",
    subTitle: "Disfruta la vida en tu casa soñada",
      //homePage
    typeText: "Tipo",
    btnInfo:"Informação",
    btnPlaces:"Lugares",
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
