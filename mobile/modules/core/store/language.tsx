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
  error:string
  required:string;
  limit:string 
  noNegative:string
  loading:string
  //auth
  title: string;
  subTitle: string;
  invalidEmailAuth:string;
  invalidPasswordAuth:string
  forgotYourPasswordAuth:string
  orAuth:string
  googleAuth:string
  btnGoogleAuth:string
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
  profileRESelected:string
  profileREFavorites:string
  profileCreateRE:string
  profileEditUser:string
  //realEstate
  titleAnswerModal:string
  placeHolderAnswer:string
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
    error:"Error",
    required:"This field is required",
    limit:"It must be 100 characters or less",
    noNegative:"This field must be a non-negative integer",
    loading:"Loading...",
    //auth
    title: "Sign in",
    subTitle: "Enjoy life in your dream home",
    invalidEmailAuth:"Invalid email",
    invalidPasswordAuth:"Must be at least 6 characters",
    forgotYourPasswordAuth:"Forgot your password?",
    orAuth:"or",
    googleAuth:"Sign in with Google",
    btnGoogleAuth:"Sign in with google",
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
    profileRESelected:"Real estates",
    profileREFavorites:"favorites",
    profileCreateRE:"Create estate",
    profileEditUser:"Edit user",
    //real estate
    titleAnswerModal:"Answer question",
    placeHolderAnswer:"Answer",
  },
  es: {
    //shared
    titleConfig: "Idioma",
    titleModalConfig: "Configuracion",
    spanishConfig: "Español",
    englishConfig: "Inglés",
    portugueseConfig: "Portugués",
    sucess: "Exitoso",
    error:"Error",
    required:"Este campo es requerido",
    limit:"Debe ser 100 caracteres o menos",
    noNegative:"Este campo no debe tener valores negativos",
    loading:"Cargando...",
    //auth
    title: "Iniciar sesion",
    subTitle: "Disfruta la vida en tu casa soñada",
    invalidEmailAuth:"Correo inválido",
    invalidPasswordAuth:"Debe tener al menos 6 caracteres",
    forgotYourPasswordAuth:"¿Olvidaste tu contraseña?",
    orAuth:"o",
    googleAuth:"Inicia sesion con google",
    btnGoogleAuth:"Login con google",
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
    profileRESelected:"Inmuebles",
    profileREFavorites:"Favoritos",
    profileCreateRE:"Crear inmueble",
    profileEditUser:"Editar usuario",
    //real estate
    titleAnswerModal:"Responder pregunta",
    placeHolderAnswer:"respuesta"
  },
  pt: {
    //shared
    titleConfig: "linguagem",
    titleModalConfig: "configuração",
    spanishConfig: "Espanhol",
    englishConfig: "Inglês",
    portugueseConfig: "Português",
    sucess: "bem-sucedido",
    error:"erro",
    required:"Este campo é obrigatório",
    limit:"Deve ter 100 caracteres ou menos",
    noNegative:"Devem ser um número inteiro não negativo",
    loading:"carregando...",
    //auth
    title: "Entrar",
    subTitle: "Disfruta la vida en tu casa soñada",
    invalidEmailAuth:"Email inválido",
    invalidPasswordAuth:"Deve ter pelo menos 6 caracteres",
    forgotYourPasswordAuth:"Esqueceu sua senha?",
    orAuth:"ou",
    googleAuth:"faça login com o google",
    btnGoogleAuth:"faça login com o google",
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
    logOut:"sair",
    profileRESelected:"Propriedade",
    profileREFavorites:"favoritos",
    profileCreateRE:"criar propriedade",
    profileEditUser:"editar usuário",
    //real estate
    titleAnswerModal:"Responda a pergunta",
    placeHolderAnswer:"responder",
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
