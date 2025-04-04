import { performance } from 'perf_hooks';

import { countingSort, radixSort, bucketSort } from './sortingMethods.js';
import { generateArray } from './utils.js';

const main = () => {
  for (let n = 100; n <= 1000000; n *= 10) {
    const countingArr = generateArray(n);
    const startTime = performance.now();
    countingSort(countingArr);
    const endTime = performance.now();
    console.log(`Counting Sort ${n}: Completed in ${(endTime - startTime).toFixed(2)} ms`);
  }

  for (let n = 100; n <= 1000000; n *= 10) {
    const radixArr = generateArray(n);
    const startTime = performance.now();
    radixSort(radixArr);
    const endTime = performance.now();
    console.log(`Radix Sort ${n}: Completed in ${(endTime - startTime).toFixed(2)} ms`);
  }

  for (let n = 100; n <= 1000000; n *= 10) {
    const bucketArr = generateArray(n);
    const startTime = performance.now();
    bucketSort(bucketArr);
    const endTime = performance.now();
    console.log(`Bucket Sort ${n}: Completed in ${(endTime - startTime).toFixed(2)} ms`);
  }
};

main();
