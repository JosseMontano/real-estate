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
  save:string
  upload:string
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
  homeTitleQuestion:string
  homeTitleBoldQuestion:string;
  homeDescriptionQuestion:string
  footerTextQuestion:string
  //profile
  logOut:string
  profileRESelected:string
  profileREFavorites:string
  profileCreateRE:string
  profileEditUser:string
  //realEstate
  titleAnswerModal:string
  placeHolderAnswer:string
  realEstateBathroom:string
  realEstateBedroom:string
  realEstateQuestion:string
  realEstateFeedback:string
  //create real estate
  createRETitle:string
  createREDescription:string
  createREAmountBedrooms:string
  createREAmountBathrooms:string
  createRESquareMeter:string
  createREPrice:string
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
    save:"Save",
    upload:"Upload",
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
    homeTitleQuestion:"Make a",
    homeTitleBoldQuestion:"question",
    homeDescriptionQuestion:"Your questions are displayed in posts so owners can respond automatically.",
    footerTextQuestion:"All rights reserved",
    //profile
    logOut:"log out",
    profileRESelected:"Real estates",
    profileREFavorites:"favorites",
    profileCreateRE:"Create estate",
    profileEditUser:"Edit user",
    //real estate
    titleAnswerModal:"Answer question",
    placeHolderAnswer:"Answer",
    realEstateBathroom:"bathrooms",
    realEstateBedroom:"bedrooms",
    realEstateQuestion:"Questions",
    realEstateFeedback:"Feedback",
    //create real estate
    createRETitle:"Title",
    createREDescription:"Description",
    createREAmountBedrooms:"Amount of bedrooms",
    createREAmountBathrooms:"Amount of bathrooms",
    createRESquareMeter:"Square meters",
    createREPrice:"Price",
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
    save:"Guardar",
    upload:"Subir",
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
    homeTitleQuestion:"Haz una",
    homeTitleBoldQuestion:"Pregunta",
    homeDescriptionQuestion:"Tus preguntas se visualizan en las publicaciones para que los propietarios puedan responder de forma automática.",
    footerTextQuestion:"Todos los derechos reservados",
    //profile
    logOut:"Cerrar sesion",
    profileRESelected:"Inmuebles",
    profileREFavorites:"Favoritos",
    profileCreateRE:"Crear inmueble",
    profileEditUser:"Editar usuario",
    //real estate
    titleAnswerModal:"Responder pregunta",
    placeHolderAnswer:"respuesta",
    realEstateBathroom:"baños",
    realEstateBedroom:"cuartos",
    realEstateQuestion:"Preguntas",
    realEstateFeedback:"Reseñas",
      //create real estate
      createRETitle:"Titulo",
      createREDescription:"Descripcion",
      createREAmountBathrooms:"Cantidad de baños",
      createREAmountBedrooms:"Cantidad de cuartos",
      createREPrice:"Precio",
      createRESquareMeter:"Cantidad de metros"
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
    save:"Manter",
    upload:"carregar",
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
    homeTitleQuestion:"faça uma",
    homeTitleBoldQuestion:"pergunta",
    homeDescriptionQuestion:"Suas perguntas são exibidas em postagens para que os proprietários possam responder automaticamente.",
    footerTextQuestion:"Todos os direitos reservados",
    //profile
    logOut:"sair",
    profileRESelected:"Propriedade",
    profileREFavorites:"favoritos",
    profileCreateRE:"criar propriedade",
    profileEditUser:"editar usuário",
    //real estate
    titleAnswerModal:"Responda a pergunta",
    placeHolderAnswer:"responder",
    realEstateBathroom:"banheiros",
    realEstateBedroom:"quartos",
    realEstateQuestion:"Perguntas",
    realEstateFeedback:"Comentários",
      //create real estate
      createRETitle:"título",
      createREDescription:"descrição",
      createREAmountBathrooms:"quantidade de banheiros",
      createREAmountBedrooms:"quantidade de quartos",
      createREPrice:"preço",
      createRESquareMeter:"metro quadrado"
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
