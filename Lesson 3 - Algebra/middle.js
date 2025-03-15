import MatrixUtils from './matrixUtils.js';

export const powRecursively = (a, n) => {
  if (n === 0) {
    return 1;
  }

  return a * powRecursively(a, n - 1);
};

export const pow2 = (a, n) => {
  if (n === 0) {
    return 1;
  }

  if (n === 1) {
    return a;
  }

  if (n % 2 === 0) {
    const result = pow2(a, n / 2);
    return result * result;
  }

  return pow2(a, n - 1) * a;
};

export const fibonacciGoldenRatio = (n) => {
  const ratio = (1 + Math.sqrt(5)) / 2;

  return pow2(ratio, n) / Math.sqrt(5);
};

export const fibonacciMatrix = (n) => {
  const matrixUtils = new MatrixUtils();

  let fibMatrix = matrixUtils.pow([[1, 1], [1, 0]], n);

  return fibMatrix[0][1];
};

export const simpleNumbersOptimized = (n) => {
  const isSimple = (current) => {
    for (let div = 2; div < current; div += 1) {
      if (current % div === 0) {
        return false;
      }
    }

    return true;
  };

  let count = 1;

  for (let i = 3; i <= n; i += 1) {
    if (isSimple(i)) {
      count += 1;
    }
  }

  return count;
};

const main = () => {
  const resultPowRecursively = powRecursively(3, 5);
  console.log(resultPowRecursively);

  const resultPow2 = pow2(3, 5);
  console.log(resultPow2);

  const resultFibonacciGoldenRatio = fibonacciGoldenRatio(8);
  console.log(resultFibonacciGoldenRatio);

  const resultFibonacciMatrix = fibonacciMatrix(8);
  console.log(resultFibonacciMatrix);

  const resultSimpleNumbersOptimized = simpleNumbersOptimized(30);
  console.log(resultSimpleNumbersOptimized);
};
  
main();