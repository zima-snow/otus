import { bubbleSort, insertionSort, shellSort } from './sortingMethods.js';
import { generateArray } from './utils.js';

const main = () => {
  const bubbleArr100 = generateArray(100);
  const bubbleArr1000 = generateArray(1000);
  const bubbleArr10000 = generateArray(10000);

  bubbleSort(bubbleArr100);
  console.log(bubbleArr100);
  bubbleSort(bubbleArr1000);
  console.log(bubbleArr1000);
  bubbleSort(bubbleArr10000);
  console.log(bubbleArr10000);

  const insertionArr100 = generateArray(100);
  const insertionArr1000 = generateArray(1000);
  const insertionArr10000 = generateArray(10000);

  insertionSort(insertionArr100);
  console.log(insertionArr100);
  insertionSort(insertionArr1000);
  console.log(insertionArr1000);
  insertionSort(insertionArr10000);
  console.log(insertionArr10000);

  const shellArr100 = generateArray(100);
  const shellArr1000 = generateArray(1000);
  const shellArr10000 = generateArray(10000);

  shellSort(shellArr100);
  console.log(shellArr100);
  shellSort(shellArr1000);
  console.log(shellArr1000);
  shellSort(shellArr10000);
  console.log(shellArr10000);
};

main();
