import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Core Configuration
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'nep'],
    
    // Fix for the "languageOnly" error
    // Use 'languageOnly' to ensure 'ne-NP' looks for the 'ne' folder
    load: 'languageOnly', 

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already safes from xss
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Optional: Helps you see errors in the console during development
    debug: true, 
  });

export default i18n;