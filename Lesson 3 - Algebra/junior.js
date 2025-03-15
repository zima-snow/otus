export const pow = (a, n) => {
  let result = 1;

  for (let i = 1; i <= n; i += 1) {
    result *= a;
  }

  return result;
};

export const fibonacciRecursively = (n) => {
  if (n <= 2) {
    return 1;
  }

  return fibonacciRecursively(n - 2) + fibonacciRecursively(n - 1);
};

export const fibonacciIteratively = (n) => {
  if (n <= 2) {
    return 1;
  }

  let fibPrev1 = 1;
  let fibPrev2 = 1;
  let index = 3;
  let result = 0;

  while (index <= n) {
    result = fibPrev2 + fibPrev1;
    fibPrev2 = fibPrev1;
    fibPrev1 = result;
    index += 1;
  }

  return result;
};

export const simpleNumbers = (n) => {
  let count = 0;

  for (let i = 2; i <= n; i += 1) {
    let divider = 2;

    while (divider < i) {
      if (i % divider === 0) {
        break;
      }

      divider += 1;
    }

    if (divider === i) {
      count += 1;
    }
  }

  return count;
};

const main = () => {
  const resultPow = pow(2, 5);
  console.log(resultPow);

  const resultFibonacciRecursively = fibonacciRecursively(8);
  console.log(resultFibonacciRecursively);

  const resultFibonacciIteratively = fibonacciIteratively(6);
  console.log(resultFibonacciIteratively);

  const resultSimpleNumbers = simpleNumbers(30);
  console.log(resultSimpleNumbers);
};
  
main();
