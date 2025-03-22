import {
  bubbleSortOptimized,
  insertionSortWithShift,
  shellSortGapByKnuth,
  shellSortGapBySendewick,
} from './sortingMethods.js';
import { generateArray } from './utils.js';

const main = () => {
  const bubbleArr100 = generateArray(100);
  const bubbleArr1000 = generateArray(1000);
  const bubbleArr10000 = generateArray(10000);
  const bubbleArr100000 = generateArray(100000);

  bubbleSortOptimized(bubbleArr100);
  console.log(bubbleArr100);
  bubbleSortOptimized(bubbleArr1000);
  console.log(bubbleArr1000);
  bubbleSortOptimized(bubbleArr10000);
  console.log(bubbleArr10000);
  bubbleSortOptimized(bubbleArr100000);
  console.log(bubbleArr100000);

  const insertionArr100 = generateArray(100);
  const insertionArr1000 = generateArray(1000);
  const insertionArr10000 = generateArray(10000);
  const insertionArr100000 = generateArray(100000);

  insertionSortWithShift(insertionArr100);
  console.log(insertionArr100);
  insertionSortWithShift(insertionArr1000);
  console.log(insertionArr1000);
  insertionSortWithShift(insertionArr10000);
  console.log(insertionArr10000);
  insertionSortWithShift(insertionArr100000);
  console.log(insertionArr100000);

  const shellArrKnuth100 = generateArray(100);
  const shellArrKnuth1000 = generateArray(1000);
  const shellArrKnuth10000 = generateArray(10000);
  const shellArrKnuth100000 = generateArray(100000);
  const shellArrKnuth1000000 = generateArray(1000000);

  shellSortGapByKnuth(shellArrKnuth100);
  console.log(shellArrKnuth100);
  shellSortGapByKnuth(shellArrKnuth1000);
  console.log(shellArrKnuth1000);
  shellSortGapByKnuth(shellArrKnuth10000);
  console.log(shellArrKnuth10000);
  shellSortGapByKnuth(shellArrKnuth100000);
  console.log(shellArrKnuth100000);
  shellSortGapByKnuth(shellArrKnuth1000000);
  console.log(shellArrKnuth1000000);

  const shellArrSendewick100 = generateArray(100);
  const shellArrSendewick1000 = generateArray(1000);
  const shellArrSendewick10000 = generateArray(10000);
  const shellArrSendewick100000 = generateArray(100000);
  const shellArrSendewick1000000 = generateArray(1000000);

  shellSortGapBySendewick(shellArrSendewick100);
  console.log(shellArrSendewick100);
  shellSortGapBySendewick(shellArrSendewick1000);
  console.log(shellArrSendewick1000);
  shellSortGapBySendewick(shellArrSendewick10000);
  console.log(shellArrSendewick10000);
  shellSortGapBySendewick(shellArrSendewick100000);
  console.log(shellArrSendewick100000);
  shellSortGapBySendewick(shellArrSendewick1000000);
  console.log(shellArrSendewick1000000);
};

main();
