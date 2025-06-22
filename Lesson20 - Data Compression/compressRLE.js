export const compressRLE = (str) => {
  if (str.length === 0) return '';

  let compressed = '';
  let currentChar = str[0];
  let count = 1;

  for (let i = 1; i < str.length; i++) {
    if (str[i] === currentChar) {
      count++;
    } else {
      compressed += currentChar + (count > 1 ? count : '');
      currentChar = str[i];
      count = 1;
    }
  }

  compressed += currentChar + (count > 1 ? count : '');

  return compressed;
};
