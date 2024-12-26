import { create } from "zustand";

export type Language = "en" | "es" | "pt";

export type TranslateRes = {
  es: string;
  en: string;
  pt: string;
};

export interface Translations {
  //Dash
  //realEstate
  titleRE:string
  amountBedroomsRE:string
  amountBathroomsRE:string
  squareMetersRE:string
  priceRE:string
  activeRE:string
  //typeRE
  nameTypeRE:string
  //question
  questionDash:string
  //comments
  commentsDash:string
  starsDash:string
  //responses
  responsesDash:string
  //reports
  userReportsDash:string
  userReportesCellphoneDash:string
  reporterEmailDash:string
  reporterCellphoneDash:string
  //global
  empty: string;
  fieldRequired: string;
  emptyComments: string;
  thereAre: string;
  activeUser: string;
  loading: string;
  //auth
  titleAuth: string;
  invalidEmailAuth: string;
  invalidPasswordAuth: string;
  invalidConfirmPasswordAuth: string;
  invalidMatchPasswordAuth: string;
  forgotPasswordAuth: string;
  btnAuth: string;
  withoutAccountAuth: string;
  orAuth: string;
  signInGoogleAuth: string;
  titleForgotPassword: string;
  recuperateAccountBtn: string;
  loginGoogleBtn: string;
  //config
  titleConfig: string;
  languageConfig: string;
  language1Config: string;
  language2Config: string;
  language3Config: string;
  //header Home
  languageHeader1: string;
  languageHeader2: string;
  languageHeader3: string;
  languageHeader4: string;
  languageHeadeBtn: string;
  //dashboard RE
  tableTile: string;
  //home page
  centralTitle: string;
  centralSubtitle: string;
  centralButton: string;
  //home search
  propertyTypeLabel: string;
  propertyTypeInput: string;
  locationLabel: string;
  locationInput: string;
  priceRangeLabel: string;
  priceRangeInput: string;
  //home house buttons
  infoButton: string;
  placesButton: string;
  viewMoreButton: string;
  similaritiesHome: string;
  //home questions
  ask: string;
  question: string;
  questionSubtitle: string;
  questionPlaceholder: string;
  saveButton: string;
  //home footer
  copyright: string;

  //profile user actions
  rating: string;
  sendMessage: string;
  following: string;
  follow: string;
  reportUser: string;
  posts: string;
  favorites: string;
  addComment: string;
  commentPlaceholder: string;
  signout: string;
  contactProfile: string;
  reportProfile: string;
  //profile RE info
  generalVisitUser: string;
  questionsVisitUer: string;
  feedbackVisitUser: string;
  addresVisitUser: string;
  amountBathroomsVisitUser: string;
  amountBedroomsVisitUser: string;
  commentsTitlteVisitUser: string;
  inputCommentVisitUser: string;
  questionTitlteVisitUser: string;
  anonymousVisitUser: string;
  //profile comments
  commentsTitle: string;
  //btn edit user
  btnEditUser: string;
  //btn add RE
  btnAddRe: string;
  //user information
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  //property details
  title: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  squareMeters: string;
  select: string;
  searchImage: string;
  filesUplodesLanguage: string;
  //dasboard sidebar
  properties: string;
  propertyType: string;
  questions: string;
  comments: string;
  responses: string;
  reports: string;
  //status statistics
  total: string;
  active: string;
  inactive: string;
  //dashboard comments
}

const translations: { [key in Language]: Translations } = {
  en: {
    titleRE:"title",
    amountBedroomsRE:"amount bathroom",
    amountBathroomsRE:"amount bedroom",
    squareMetersRE:"square meters",
    priceRE:"price",
    activeRE:"active",
    nameTypeRE:"Real Estate Type",
    questionDash:"Question",
    commentsDash:"Comments",
    starsDash:"Stars",
    responsesDash:"Responses",
    userReportsDash:"User reported email",
    userReportesCellphoneDash:"User reported cellphone",
    reporterEmailDash:"Reporter email",
    reporterCellphoneDash:"Reporter cellphone",
    empty: "No data found",
    fieldRequired: "This field is required",
    emptyComments: "No comments found",
    thereAre: "There are",
    activeUser: "Active",
    loading: "Loading...",
    //auth
    titleAuth: "Sign In",
    invalidEmailAuth: "Invalid email",
    invalidPasswordAuth: "Must be at least 6 characters",
    invalidConfirmPasswordAuth: "Must be at least 6 characters",
    invalidMatchPasswordAuth: "Passwords do not match",
    forgotPasswordAuth: "Forgot password?",
    btnAuth: "Sign In",
    withoutAccountAuth: "Don't have an account?",
    orAuth: "Or",
    signInGoogleAuth: "Sign in with Google",
    titleForgotPassword: "Forgot my password",
    recuperateAccountBtn: "Recover account",
    loginGoogleBtn: "Login with google",
    //config
    titleConfig: "Configurations",
    languageConfig: "Language",
    language1Config: "Spanish",
    language2Config: "English",
    language3Config: "Portuguese",
    //header Home
    languageHeader1: "Home",
    languageHeader2: "Properties",
    languageHeader3: "Questions",
    languageHeader4: "Contact Us",
    languageHeadeBtn: "Publish property",
    //dashboard RE
    tableTile: "Real Estates",
    //home page
    centralTitle: "The modern house makes life better.",
    centralSubtitle:
      "Discover how to improve your quality of life with a house tailored to you.",
    centralButton: "Explore our properties",
    //home search
    propertyTypeLabel: "Property",
    propertyTypeInput: "Select property",
    locationLabel: "Location",
    locationInput: "Select location",
    priceRangeLabel: "Range",
    priceRangeInput: "Select price",
    //home house buttons
    infoButton: "Information",
    placesButton: "Places",
    viewMoreButton: "View more",
    similaritiesHome: "similarities with your tastes",
    //home questions
    ask: "Ask a",
    question: "question",
    questionSubtitle:
      "Your questions will appear in the listings so owners can respond automatically.",
    questionPlaceholder: "What'd you like to know?",
    saveButton: "Save",
    //home footer
    copyright: "Copyright © INMUEBLES EN LA NUBE - All rights reserved",
    //profile user actions
    rating: "Rating",
    sendMessage: "Send message",
    following: "Following",
    follow: "Follow",
    reportUser: "Report user",
    posts: "Posts",
    favorites: "Favorites",
    addComment: "Add comment",
    commentPlaceholder: "Comment...",
    signout: "Sign out",
    contactProfile: "Contact",
    reportProfile: "Tell us the reason",
    //profile RE INF
    generalVisitUser: "General",
    questionsVisitUer: "Questions",
    feedbackVisitUser: "Feedback",
    addresVisitUser: "Addres",
    amountBathroomsVisitUser: "Bathrooms",
    amountBedroomsVisitUser: "Bedrooms",
    commentsTitlteVisitUser: "Comments",
    inputCommentVisitUser: "Write comment",
    questionTitlteVisitUser: "Question",
    anonymousVisitUser: "Anonymous",
    //comments
    commentsTitle: "Featured comment",
    //btn edit user
    btnEditUser: "Edit user",
    //btn create Re
    btnAddRe: "Create property",
    //user information
    username: "Username",
    phoneNumber: "Phone number",
    email: "Email",
    password: "Password",
    //property details
    title: "Title",
    description: "Description",
    price: "Price",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    squareMeters: "Square meters",
    select: "Select...",
    searchImage: "Search image",
    filesUplodesLanguage: "files uploaded",
    //dashboard sidebar
    properties: "Properties",
    propertyType: "Property type",
    questions: "Questions",
    comments: "Comments",
    responses: "Response",
    reports: "Reports",
    //status statistics
    total: "Total",
    active: "Active",
    inactive: "Inactive",
  },
  es: {
    titleRE:"Titulo",
    amountBedroomsRE:"Cantidad de baños",
    amountBathroomsRE:"Cantidad de cuartos",
    squareMetersRE:"Metros cuadrados",
    priceRE:"Precio",
    activeRE:"Activo",
    nameTypeRE:"Tipo de inmueble",
    questionDash:"Pregunta",
    commentsDash:"Comentarios",
    starsDash:"Estrellas",
    responsesDash:"Respuestas",
    userReportsDash:"Email del usuario reportado",
    userReportesCellphoneDash:"Celular del usuario reportado",
    reporterEmailDash:"Email del reportador",
    reporterCellphoneDash:"Celular del reportador",
    empty: "No se encontraron datos",
    fieldRequired: "Este campo es requerido",
    emptyComments: "No hay comentarios",
    thereAre: "Hay",
    activeUser: "Activo",
    loading: "Cargando...",
    //auth
    titleAuth: "Iniciar sesión",
    invalidEmailAuth: "Correo inválido",
    invalidPasswordAuth: "Debe tener al menos 6 caracteres",
    invalidConfirmPasswordAuth: "Debe tener al menos 6 caracteres",
    invalidMatchPasswordAuth: "Las contraseñas no coinciden",
    forgotPasswordAuth: "¿Olvidaste tu contraseña?",
    btnAuth: "Iniciar",
    withoutAccountAuth: "¿No tienes una cuenta?",
    orAuth: "O",
    signInGoogleAuth: "Iniciar con Google",
    titleForgotPassword: "Olvidé mi contraseña",
    recuperateAccountBtn: "Recuperar cuenta",
    loginGoogleBtn: "Login con google",
    //config
    titleConfig: "Configuraciones",
    languageConfig: "Idioma",
    language1Config: "Español",
    language2Config: "Inglés",
    language3Config: "Portugués",
    //header Home
    languageHeader1: "Inicio",
    languageHeader2: "Propiedades",
    languageHeader3: "Preguntas",
    languageHeader4: "Contáctanos",
    languageHeadeBtn: "Publicar propiedad",
    //dashboard RE
    tableTile: "Bienes Raíces",
    //home page
    centralTitle: "La casa moderna hace la vida mejor.",
    centralSubtitle:
      "Descubre cómo mejorar tu calidad de vida con una casa a tu medida.",
    centralButton: "Explora nuestras propiedades",
    //home search
    propertyTypeLabel: "Propiedad",
    propertyTypeInput: "Seleccione la propiedad",
    locationLabel: "Ubicación",
    locationInput: "Seleccione la ubicación",
    priceRangeLabel: "Precio",
    priceRangeInput: "Seleccione el precio",
    //home house buttons
    infoButton: "Información",
    placesButton: "Lugares",
    viewMoreButton: "Ver más",
    similaritiesHome: "similitudes con tus gustos",
    //home questions
    ask: "Haz una",
    question: "pregunta",
    questionSubtitle:
      "Tus preguntas se visualizarán en las publicaciones para que los propietarios puedan responder de forma automática.",
    questionPlaceholder: "¿Qué te gustaría saber?",
    saveButton: "Guardar",
    //home footer
    copyright:
      "Copyright © INMUEBLES EN LA NUBE - Todos los derechos reservados",
    //profile user actions
    rating: "Calificación",
    sendMessage: "Enviar mensaje",
    following: "Siguiendo",
    follow: "Seguir",
    reportUser: "Reportar usuario",
    posts: "Publicaciones",
    favorites: "Favoritos",
    addComment: "Agregar comentario",
    commentPlaceholder: "Comentario...",
    signout: "Cerrar sesión",
    contactProfile: "Contactar",
    reportProfile: "Cuentanos la razon",
    //PROFILE RE INFO
    generalVisitUser: "General",
    questionsVisitUer: "Preguntas",
    feedbackVisitUser: "Reseñas",
    addresVisitUser: "Direccion",
    amountBathroomsVisitUser: "Baños",
    amountBedroomsVisitUser: "Cuartos",
    commentsTitlteVisitUser: "Comentarios",
    inputCommentVisitUser: "Escriba un comentario",
    questionTitlteVisitUser: "Pregunta",
    anonymousVisitUser: "Anónimo",
    //comments
    commentsTitle: "Comentario destacado",
    //btn edit user
    btnEditUser: "Editar usuário",
    //btn create Re
    btnAddRe: "Crear inmueble",
    //user information
    username: "Nombe de usuario",
    phoneNumber: "Número de celular",
    email: "Email",
    password: "contraseña",
    //property details
    title: "Título",
    description: "Descripcion",
    price: "Precio",
    bedrooms: "Cuartos",
    bathrooms: "Baños",
    squareMeters: "Metros cuadrados",
    select: "Seleccionar...",
    searchImage: "Buscar imagen",
    filesUplodesLanguage: "Archivos cargados",
    //dasboard sidebar
    properties: "Inmuebles",
    propertyType: "Tipo de inmuebles",
    questions: "Preguntas",
    comments: "Comentarios",
    responses: "Respuestas",
    reports: "Reportes",
    //status statistics
    total: "Total",
    active: "Activos",
    inactive: "Inactivos",
  },
  pt: {
    titleRE:"título",
    amountBedroomsRE:"quantidade de quartos",
    amountBathroomsRE:"quantidade de banheiros",
    squareMetersRE:"metros quadrados",
    priceRE:"preço",
    activeRE:"ativo",
    nameTypeRE:"Tipo de imóvel",
    questionDash:"Pergunta",
    commentsDash:"Comentários",
    starsDash:"Estrelas",
    responsesDash:"Respostas",
    userReportsDash:"Email do usuário relatado",
    userReportesCellphoneDash:"Celular do usuário relatado",
    reporterEmailDash:"Email do repórter",
    reporterCellphoneDash:"Celular do repórter",
    empty: "Nenhum dado encontrado",
    fieldRequired: "Este campo é obrigatório",
    emptyComments: "Nenhum comentário",
    thereAre: "há",
    activeUser: "ativo",
    loading: "carregando...",

    //auth
    titleAuth: "Entrar",
    invalidEmailAuth: "Email inválido",
    invalidPasswordAuth: "Deve ter pelo menos 6 caracteres",
    invalidConfirmPasswordAuth: "Deve ter pelo menos 6 caracteres",
    invalidMatchPasswordAuth: "As senhas não coincidem",
    forgotPasswordAuth: "Esqueceu a senha?",
    btnAuth: "Entrar",
    withoutAccountAuth: "Não tem uma conta?",
    orAuth: "Ou",
    signInGoogleAuth: "Entrar com Google",
    titleForgotPassword: "Esqueci minha senha",
    recuperateAccountBtn: "Recuperar conta",
    loginGoogleBtn: "Faça login no Google",
    //config
    titleConfig: "Configurações",
    languageConfig: "Idioma",
    language1Config: "Espanhol",
    language2Config: "Inglês",
    language3Config: "Português",
    //header Home
    languageHeader1: "Início",
    languageHeader2: "Propriedades",
    languageHeader3: "Perguntas",
    languageHeader4: "Contate-nos",
    languageHeadeBtn: "Publicar propriedade",
    //dashboard RE
    tableTile: "Imóveis",
    //home page
    centralTitle: "A casa moderna torna a vida melhor.",
    centralSubtitle:
      "Descubra como melhorar sua qualidade de vida com uma casa feita para você.",
    centralButton: "Explore nossas propriedades",
    //home search
    propertyTypeLabel: "Propriedade",
    propertyTypeInput: "Selecione a propriedade",
    locationLabel: "Localização",
    locationInput: "Selecione a localização",
    priceRangeLabel: "Preço",
    priceRangeInput: "Selecione o preço",
    //home house buttons
    infoButton: "Informação",
    placesButton: "Lugares",
    viewMoreButton: "Ver mais",
    similaritiesHome: "semelhanças com seus gostos",
    //home questions
    ask: "Faça uma",
    question: "pergunta",
    questionSubtitle:
      "Suas perguntas aparecerão nas postagens para que os proprietários possam responder automaticamente.",
    questionPlaceholder: "O que você gostaria de saber?",
    saveButton: "Salvar",
    //home footer
    copyright:
      "Copyright © INMUEBLES EN LA NUBE - Todos os direitos reservados",
    //profile user actions
    rating: "Classificação",
    sendMessage: "Enviar mensagem",
    following: "seguindo",
    follow: "continuar",
    reportUser: "Denunciar usuário",
    posts: "Publicações",
    favorites: "Favoritos",
    addComment: "Adicionar comentário",
    commentPlaceholder: "Comentário...",
    signout: "Sair",
    contactProfile: "contato",
    reportProfile: "diga-nos o motivo",
    // profile RE
    generalVisitUser: "Geral",
    questionsVisitUer: "Perguntas",
    feedbackVisitUser: "Feedback",
    addresVisitUser: "Endereço",
    amountBathroomsVisitUser: "Banheiros",
    amountBedroomsVisitUser: "Quartos",
    commentsTitlteVisitUser: "Comentários",
    inputCommentVisitUser: "Escreva um comentário",
    questionTitlteVisitUser: "Pergunta",
    anonymousVisitUser: "Anônimo",
    //comments
    commentsTitle: "Comentário em destaque",
    //btn edit user
    btnEditUser: "Editar usuário",
    //btn create Re
    btnAddRe: "Criar imóvel",
    //user information
    username: "Nome de usuário",
    phoneNumber: "Número de celular",
    email: "Email",
    password: "Senha",
    //property details
    title: "Título",
    description: "Descrição",
    price: "Preço",
    bedrooms: "Quartos",
    bathrooms: "Banheiros",
    squareMeters: "Metros quadrados",
    select: "Selecionar...",
    searchImage: "Buscar imagem",
    filesUplodesLanguage: "arquivos enviados",
    //dasboard sidebar
    properties: "Imóveis",
    propertyType: "Tipo de imóveis",
    questions: "Perguntas",
    comments: "Comentários",
    responses: "Respostas",
    reports: "relatórios",
    //status statistics
    total: "Total",
    active: "Ativos",
    inactive: "Inativos",
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
