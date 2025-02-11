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
  invalidEmailAuth:string;
  invalidPasswordAuth:string
  //homePage
  typeText: string;
  selectType:string
  btnInfo:string
  btnPlaces:string
  createRE:string
  homeTitle:string
  homeDescription:string
  homeBtn:string
  //profile
  logOut:string
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
    invalidEmailAuth:"Invalid email",
    invalidPasswordAuth:"Must be at least 6 characters",
    //homePage
    typeText: "Type",
    selectType:"Select type",
    btnInfo:"Information",
    btnPlaces:"Places",
    createRE:"Post real estate",
    homeTitle:"Modern house makes life better",
    homeDescription:"Discover how to improve your quality of life with a home tailored to you.",
    homeBtn: "Explore our properties",
    //profile
    logOut:"log out",
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
    invalidEmailAuth:"Correo inválido",
    invalidPasswordAuth:"Debe tener al menos 6 caracteres",
      //homePage
    typeText: "Tipo",
    selectType:"Seleccionar tipo",
    btnInfo:"Informacion",
    btnPlaces:"Lugares",
    createRE:"Publicar propiedad",
    homeTitle:"La casa moderna hace la vida mejor.",
    homeDescription:"Descubre cómo mejorar tu calidad de vida con una casa a tu medida.",
    homeBtn:"Explora nuestras propiedades",
    //profile
    logOut:"Cerrar sesion",
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
    invalidEmailAuth:"Email inválido",
    invalidPasswordAuth:"Deve ter pelo menos 6 caracteres",
      //homePage
    typeText: "Tipo",
     selectType:"selecione o tipo",
    btnInfo:"Informação",
    btnPlaces:"Lugares",
    createRE:"publicar propriedade",
    homeTitle:"A casa moderna torna a vida melhor.",
    homeDescription:"Descubra como melhorar a sua qualidade de vida com uma casa à sua medida.",
    homeBtn:"Explore nossos imóveis",
    //profile
    logOut:"sair"
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
