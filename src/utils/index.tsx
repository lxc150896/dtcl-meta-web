
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

export const validateUsserName = (input: string) => {
  if (!input.includes('#')) {
    return 'Vui lòng nhập đúng định (vd: EA7 Gnut#2004)';
  }

  const [name, tag] = input.split('#');

  if (!name.trim()) {
    return 'Vui lòng nhập tên trước dấu #';
  }

  if (!tag?.trim()) {
    return 'Vui lòng nhập tag sau dấu #';
  }

  return '';
};
