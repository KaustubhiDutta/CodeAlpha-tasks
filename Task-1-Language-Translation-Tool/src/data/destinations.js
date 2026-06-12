import { countries } from "./countries";
import { indianStates } from "./indianStates";

const stateGreetings = {
  ta: "வணக்கம்",
  te: "నమస్కారం",
  ml: "നമസ്കാരം",
  kn: "ನಮಸ್ಕಾರ",
  mr: "नमस्कार",
  gu: "નમસ્તે",
  pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  bn: "নমস্কার",
  or: "ନମସ୍କାର",
  as: "নমস্কাৰ",
  hi: "नमस्ते",
  ur: "السلام علیکم"
};

const countryGreetings = {
  ja: "こんにちは",
  fr: "Bonjour",
  de: "Hallo",
  es: "Hola",
  it: "Ciao",
  pt: "Olá",
  ru: "Привет",
  ko: "안녕하세요",
  zh: "你好",
  ar: "مرحبا",
  th: "สวัสดี",
  vi: "Xin chào",
  tr: "Merhaba",
  nl: "Hallo",
  el: "Γεια σας",
  en: "Hello"
};  
export const destinations = [

  // Countries
  ...countries.map(country => ({
    id: country.code,
    country: country.name,
    city: country.name,
    greeting:
  countryGreetings[country.language] ||
  "Hello",
    languageName: country.language,
    language: country.language,
    flag: country.flag,
    type: "country",
    image: `/images/${country.name}.jpg`
  })),

  // Indian States
  ...indianStates.map(state => ({
    id: state.code,
    country: "India",
    city: state.name,
    greeting:
  stateGreetings[state.language] ||
  "नमस्ते",
    languageName: state.language,
    language: state.language,
    flag: state.flag,
    type: "state",
    image: `/images/${state.name}.jpg`
  }))
];

export const allDestinations = destinations;