export const generateArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i += 1) {
    const item = Math.floor(Math.random() * (length - i)) + i;
    arr.push(item);
  }

  return arr;
};
