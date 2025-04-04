const getMax = (arr) => {
  const arrLength = arr.length;
  let max = arr[0];

  for (let i = 1; i < arrLength; i += 1) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
};

export const countingSort = (arr) => {
  const max = getMax(arr);
  const length = arr.length;
  const sums = Array.from({ length: max + 1 }).fill(0);
  const auxiliary = Array.from({ length });

  for (let i = 0; i < length; i += 1) {
    sums[arr[i]] += 1;
  }

  let a = 0;
  for (let i = 0; i <= max; i += 1) {
    a += sums[i];
    sums[i] = a;
  }

  for (let i = length - 1; i >= 0; i -= 1) {
    sums[arr[i]] -= 1;
    auxiliary[sums[arr[i]]] = arr[i];
  }

  for (let i = 0; i < length; i += 1) {
    arr[i] = auxiliary[i];
  }
};

export const radixSort = (arr) => {
  const length = arr.length;
  const base = 10;
  const digits = 3;
  const auxiliary = Array.from({ length });
  let currentRadix = 1;

  for (let d = 0; d < digits; d += 1) {
    const radix = Array.from({ length: 10 }).fill(0);

    for (let i = 0; i < length; i += 1) {
      const currentDigit = Math.floor(arr[i] / currentRadix % base);
      radix[currentDigit] += 1;
    }

    let a = 0;

    for (let i = 0; i <= base; i += 1) {
      a += radix[i];
      radix[i] = a;
    }

    for (let i = length - 1; i >= 0; i -= 1) {
      const currentDigit = Math.floor(arr[i] / currentRadix % base);
      radix[currentDigit] -= 1;
      auxiliary[radix[currentDigit]] = arr[i];
    }

    for (let i = 0; i < length; i += 1) {
      arr[i] = auxiliary[i];
    }

    currentRadix *= base;
  }
};

export const bucketSort = (arr) => {
  const length = arr.length;
  const numBuckets = 10;
  let j = 0;
  const buckets = Array.from({ length: numBuckets }).fill(null);

  for (let i = 0; i < length; i += 1) {
    const m = Math.floor((arr[i] * numBuckets) / 1000);

    if (buckets[m] === null) {
      buckets[m] = [];
    }

    if (buckets[m].length === 0) {
      buckets[m].push(arr[i]);
    } else {
      j = 0;

      while (j < buckets[m].length && buckets[m][j] < arr[i]) {
        j += 1;
      }

      buckets[m][j] = arr[i];
    }

    j = 0;

    for (let i = 0; i < buckets.length; i += 1) {
      if (buckets[i] === null) {
        continue;
      }

      for (let k = 0; k < buckets[i].length; k += 1) {
        arr[j++] = buckets[i][k];
      }
    }
  }
};
