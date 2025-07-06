export const decompressRLEString = (str) => {
  if (str.length === 0) return '';

  let result = '';
  let i = 0;

  while (i < str.length) {
    const char = str[i];

    // Если символ — пробел или перенос строки, добавляем его без счётчика
    if (char === ' ' || char === '\n') {
      result += char;
      i++;
      continue;
    }

    // Для остальных символов извлекаем все цифры после них
    let numStr = '';
    let j = i + 1;
    
    while (j < str.length && /\d/.test(str[j])) {
      numStr += str[j];
      j++;
    }

    if (numStr.length === 0) {
      throw new Error(`Invalid RLE format: expected digit after character at position ${i}`);
    }

    const count = parseInt(numStr, 10);
    if (count <= 0) {
      throw new Error(`Invalid RLE count: must be positive at position ${i + 1}`);
    }

    result += char.repeat(count);
    i = j; // Перемещаем указатель на позицию после числа
  }

  return result;
};
