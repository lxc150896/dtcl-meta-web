import type { Language } from '@/i18n';
import { translations } from '@/i18n/translations';

const normalizeText = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

export const search = (text: string, data: unknown[], key: string) => {
  const keywords = normalizeText(text).split(/\s+/);
  return data.filter((item) => {
    const value = normalizeText((item as Record<string, unknown>)[key] as string || '');
    return keywords.every(keyword => value.includes(keyword));
  });
};

export const validateUsserName = (input: string, language: Language = 'vi') => {
  const t = translations[language] || translations.vi;
  
  if (!input.includes('#')) {
    return t.validation.invalidFormat;
  }

  const [name, tag] = input.split('#');

  if (!name.trim()) {
    return t.validation.missingName;
  }

  if (!tag?.trim()) {
    return t.validation.missingTag;
  }

  return '';
};
