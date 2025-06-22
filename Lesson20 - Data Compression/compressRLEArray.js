export const compressRLEArray = (arr) => {
  if (arr.length === 0) return [];

  let compressed = [];
  let currentValue = arr[0];
  let count = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === currentValue) {
      count++;
    } else {
      compressed.push([currentValue, count]);
      currentValue = arr[i];
      count = 1;
    }
  }

  compressed.push([currentValue, count]);

  return compressed;
};
