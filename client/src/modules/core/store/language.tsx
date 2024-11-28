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
  follow: string;
  reportUser: string;
  posts: string;
  favorites: string;
  addComment: string;
  commentPlaceholder: string;
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
  //status statistics
  total: string;
  active: string;
  inactive: string;
  //dashboard comments
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
    //home questions
    ask: "Ask a",
    question: "question",
    questionSubtitle:
      "Your questions will appear in the listings so owners can respond automatically.",
    questionPlaceholder: "What would you like to know?",
    saveButton: "Save",
    //home footer
    copyright: "Copyright © INMUEBLES EN LA NUBE - All rights reserved",
    //profile user actions
    rating: "Rating",
    sendMessage: "Send message",
    follow: "Follow",
    reportUser: "Report user",
    posts: "Posts",
    favorites: "Favorites",
    addComment: "Add comment",
    commentPlaceholder: "Comment...",
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
    //status statistics
    total: "Total",
    active: "Active",
    inactive: "Inactive",
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
    //home questions
    ask: "Haz una",
    question: "preguna",
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
    follow: "Seguir",
    reportUser: "Reportar usuario",
    posts: "Publicaciones",
    favorites: "Favoritos",
    addComment: "Agregar comentario",
    commentPlaceholder: "Comentario...",
    //comments
    commentsTitle: "Comentario destacado",
    //btn edit user
    btnEditUser: "Editar usuario",
    btnAddRe: "Crear inmueble",
    //user information
    username: "Nombre de usuario",
    phoneNumber: "Número de celular",
    email: "Correo",
    password: "Contraseña",
    //property details
    title: "Título",
    description: "Descripción",
    price: "Precio",
    bedrooms: "Habitaciones",
    bathrooms: "Baños",
    squareMeters: "Metros cuadrados",
    select: "Seleccionar...",
    searchImage: "Buscar imagen",
    filesUplodesLanguage: "archivos subidos",
    //dasboard sidebar
    properties: "Inmuebles",
    propertyType: "Tipo de inmuebles",
    questions: "Preguntas",
    comments: "Comentarios",
    responses: "Respuestas",
    //status statistics
    total: "Total",
    active: "Activos",
    inactive: "Inactivos",
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
    follow: "Seguir",
    reportUser: "Denunciar usuário",
    posts: "Publicações",
    favorites: "Favoritos",
    addComment: "Adicionar comentário",
    commentPlaceholder: "Comentário...",
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
