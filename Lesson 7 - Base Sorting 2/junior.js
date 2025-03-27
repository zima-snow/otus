import { selectionSort, heapSort } from './sortingMethods.js';
import { generateArray } from './utils.js';

const main = () => {
  const selectionArr100 = generateArray(100);
  const selectionArr1000 = generateArray(1000);
  const selectionArr10000 = generateArray(10000);
  const selectionArr100000 = generateArray(100000);
  const selectionArr1000000 = generateArray(1000000);

  selectionSort(selectionArr100);
  console.log(selectionArr100);
  selectionSort(selectionArr1000);
  console.log(selectionArr1000);
  selectionSort(selectionArr10000);
  console.log(selectionArr10000);
  selectionSort(selectionArr100000);
  console.log(selectionArr100000);
  selectionSort(selectionArr1000000);
  console.log(selectionArr1000000);

  const heapArr100 = generateArray(100);
  const heapArr1000 = generateArray(1000);
  const heapArr10000 = generateArray(10000);
  const heapArr100000 = generateArray(100000);
  const heapArr1000000 = generateArray(1000000);

  heapSort(heapArr100);
  console.log(heapArr100);
  heapSort(heapArr1000);
  console.log(heapArr1000);
  heapSort(heapArr10000);
  console.log(heapArr10000);
  heapSort(heapArr100000);
  console.log(heapArr100000);
  heapSort(heapArr1000000);
  console.log(heapArr1000000);
};

main();
