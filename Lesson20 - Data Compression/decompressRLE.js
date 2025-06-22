export const decompressRLEString = (str) => {
  let result = '';
  let i = 0;

  while (i < str.length) {
    let char = str[i++];
    
    // Если следующий символ не цифра - это одиночный символ
    if (i >= str.length || !/\d/.test(str[i])) {
      result += char;
      continue;
    }

    // Собираем все цифры после символа
    let countStr = '';
    while (i < str.length && /\d/.test(str[i])) {
      countStr += str[i++];
    }

    const count = parseInt(countStr, 10);
    result += char.repeat(count);
  }

  return result;
}
