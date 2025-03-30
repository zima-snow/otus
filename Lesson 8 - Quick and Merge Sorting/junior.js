import { quickSort, mergeSort } from './sortingMethods.js';
import { generateArray } from './utils.js';

const main = () => {
  const quickArr100 = generateArray(100);
  const quickArr1000 = generateArray(1000);
  const quickArr10000 = generateArray(10000);
  const quickArr100000 = generateArray(100000);
  const quickArr1000000 = generateArray(1000000);

  quickSort(quickArr100);
  console.log(quickArr100);
  quickSort(quickArr1000);
  console.log(quickArr1000);
  quickSort(quickArr10000);
  console.log(quickArr10000);
  quickSort(quickArr100000);
  console.log(quickArr100000);
  quickSort(quickArr1000000);
  console.log(quickArr1000000);

  const mergeArr100 = generateArray(100);
  const mergeArr1000 = generateArray(1000);
  const mergeArr10000 = generateArray(10000);
  const mergeArr100000 = generateArray(100000);
  const mergeArr1000000 = generateArray(1000000);

  mergeSort(mergeArr100);
  console.log(mergeArr100);
  mergeSort(mergeArr1000);
  console.log(mergeArr1000);
  mergeSort(mergeArr10000);
  console.log(mergeArr10000);
  mergeSort(mergeArr100000);
  console.log(mergeArr100000);
  mergeSort(mergeArr1000000);
  console.log(mergeArr1000000);
};

main();
