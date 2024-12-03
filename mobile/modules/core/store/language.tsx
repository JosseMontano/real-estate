import { create } from "zustand";

export type Language = "en" | "es" | "pt";

export type TranslateRes = {
  es: string;
  en: string;
  pt: string;
};

export interface Translations{
    //auth
    title:string
    subTitle:string
}

const translations: { [key in Language]: Translations } ={
    en:{
        title:"Welcome to InmoApp",
        subTitle:"Enjoy life in your dream home"
    },
    es:{
        title:"Bienvenido a InmoApp",
        subTitle:"Disfruta la vida en tu casa soñada"
    },
    pt:{
        title:"Bem-vindo ao InmoApp",
        subTitle:"Disfruta la vida en tu casa soñada"
    }
}


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
  