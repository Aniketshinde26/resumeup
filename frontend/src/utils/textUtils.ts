export const MAX_PROJECT_WORDS = 200;

export const countWords = (text: string): number => {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
};

export const limitWords = (text: string, max: number): string => {
  let count = 0;
  let out = "";
  for (const tok of text.split(/(\s+)/)) {
    if (/\S/.test(tok)) {
      if (count >= max) break;
      count++;
    }
    out += tok;
  }
  return out;
};
