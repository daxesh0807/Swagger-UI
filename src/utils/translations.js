import enTranslations from '../public/locales/en.json';
import arTranslations from '../public/locales/ar.json';

export const useTranslations = (language) => {
  const translations = {
    en: enTranslations,
    ar: arTranslations,
  };

  return translations[language];
};
