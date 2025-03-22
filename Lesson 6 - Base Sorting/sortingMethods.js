export const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const bubbleSort = (arr) => {
  const arrLength = arr.length;

  for (let i = 0; i < arrLength - 1; i += 1) {
    for (let j = 1; j < arrLength; j += 1) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j);
      }
    }
  }
};

export const insertionSort = (arr) => {
  const arrLength = arr.length;

  for (let i = 1; i < arrLength; i += 1) {
    let current = i - 1;

    while (current >= 0) {
      if (arr[current] <= arr[current + 1]) {
        break;
      }

      swap(arr, current, current + 1);
      current -= 1;
    }
  }
};

export const shellSort = (arr) => {
  const arrLength = arr.length;
  let gap = arrLength / 2;

  while (gap >= 1) {
    for (let i = gap; i < arrLength; i += 1) {
      for (let j = i; j >= gap; j -= gap) {
        if (arr[j - gap] <= arr[j]) {
          break;
        }

        swap(arr, j - gap, j);
      }
    }

    gap = Math.floor(gap / 2);
  }
};

export const bubbleSortOptimized = (arr) => {
  const arrLength = arr.length;
  let flag = false;

  for (let i = 0; i < arrLength - 1; i += 1) {
    flag = false;

    for (let j = 1; j < arrLength; j += 1) {
      if (arr[j - 1] > arr[j]) {
        flag = true;

        swap(arr, j - 1, j);
      }
    }

    if (flag === false) {
      break;
    }
  }
};

export const insertionSortWithShift = (arr) => {
  const arrLength = arr.length;

  for (let i = 1; i < arrLength; i += 1) {
    let current = i;
    const currentItem = arr[i];

    while (current > 0) {
      if (arr[current - 1] <= currentItem) {
        break;
      }

      arr[current] = arr[current - 1];
      current -= 1;
    }

    arr[current] = currentItem;
  }
};

function generateKnuthGaps(n) {
  const gaps = [];
  let k = 1;

  while (true) {
    const gap = (Math.pow(3, k) - 1) / 2;

    if (gap > n / 3) {
      break;
    }

    gaps.push(gap);

    k += 1;
  }

  return gaps.reverse();
}

export const shellSortGapByKnuth = (arr) => {
  const arrLength = arr.length;
  const gaps = generateKnuthGaps(arrLength);

  for (const gap of gaps) {
    for (let i = gap; i < arrLength; i += 1) {
      for (let j = i; j >= gap; j -= gap) {
        if (arr[j - gap] <= arr[j]) {
          break;
        }

        swap(arr, j - gap, j);
      }
    }
  }
};

function generateSedgewickGaps(n) {
  const gaps = [1];
  let i = 1;

  while (true) {
    const gap1 = Math.pow(4, i + 1) - 3 * (Math.pow(2, i + 1)) + 1;
    const gap2 = 9 * (Math.pow(4, i)) - 9 * (Math.pow(2, i)) + 1;

    if (gap1 < n) {
      gaps.push(gap1);
    }

    if (gap2 < n) {
      gaps.push(gap2);
    }

    if (gap1 >= n && gap2 >= n) {
      break;
    }

    i++;
  }

  return gaps;
}

export const shellSortGapBySendewick = (arr) => {
  const arrLength = arr.length;
  const gaps = generateSedgewickGaps(arrLength);

  for (let gapIndex = gaps.length - 1; gapIndex >= 0; gapIndex--) {
    const gap = gaps[gapIndex];

    for (let i = gap; i < arrLength; i += 1) {
      for (let j = i; j >= gap; j -= gap) {
        if (arr[j - gap] <= arr[j]) {
          break;
        }

        swap(arr, j - gap, j);
      }
    }
  }
};
