import { translations, Translations, Language } from './translations';

export const useTranslation = (language: Language) => {
  const t = translations[language] || translations.en;
  
  return {
    t,
    language,
  };
};

export type { Translations, Language };
export { translations };

