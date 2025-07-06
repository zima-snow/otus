export const compressRLE = (str) => {
  if (str.length === 0) return '';

  let compressed = '';
  let currentChar = str[0];
  let count = 1;

  for (let i = 1; i < str.length; i++) {
    if (str[i] === currentChar) {
      count++;
    } else {
      if (currentChar === ' ' || currentChar === '\n') {
        compressed += currentChar;
      } else {
        compressed += currentChar + count;
      }

      currentChar = str[i];
      count = 1;
    }
  }

  if (currentChar === ' ' || currentChar === '\n') {
    compressed += currentChar;
  } else {
    compressed += currentChar + count;
  }

  return compressed;
};
