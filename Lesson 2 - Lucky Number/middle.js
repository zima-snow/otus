/* Recursion Approach */
const getLuckyTicketsCountRecursively = (n) => {
  let count = 0;

  const next = (n, sumA = 0, sumB = 0) => {
    if (n === 0) {
      if (sumA === sumB) {
        count += 1;
      }

      return;
    }
  
    for (let a = 0; a < 10; a += 1) {
      for (let b = 0; b < 10; b += 1) {
        next(n - 1, sumA + a, sumB + b);
      }
    }
  };

  next(n);

  return count;
};

/* DP Approach */
const getLuckyTicketsCountDP = (n) => {
  const base = 9;
  let sums = Array.from({ length: 10 }).fill(1n);

  const next = (counter) => {
    if (counter > n) {
      return;
    }

    const length = base * counter;
    const newSums = Array.from({ length: length + 1 }).fill(0n);

    for (let i = 0; i <= base; i += 1) {
      for (let j = 0; j <= length; j += 1) {
        const leftEdgeForNoZero = i;
        const rightEdgeForNoZero = i + base * (counter - 1);

        const condition = j >= leftEdgeForNoZero && j <= rightEdgeForNoZero;
        const value = condition ? sums[j - i] : 0n;

        newSums[j] = newSums[j] + value;
      }
    }

    sums = newSums;

    next(counter + 1);
  };

  next(1);

  return sums.reduce((acc, item) => acc + item * item, 0n);
}

const main = () => {
  // const result = getLuckyTicketsCountRecursively(5); // Recursion Approach, O(10 ^ n);
  const result = getLuckyTicketsCountDP(10); // DP Approach, O(90 * N ^ 2)
  console.log(`${result}`);
};

main();
