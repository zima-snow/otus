export const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const selectionSort = (arr) => {
  const arrLength = arr.length;

  for (let i = 0; i < arrLength - 1; i += 1) {
    let minIndex = i;

    for (let j = i + 1; j < arrLength; j += 1) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      swap(arr, i, minIndex);
    }
  }
};

export const heapify = (arr, root, size) => {
  let p = root;
  let l = 2 * p + 1;
  let r = 2 * p + 2;

  if (l < size && arr[l] > arr[p]) {
    p = l;
  }

  if (r < size && arr[r] > arr[p]) {
    p = r;
  }

  if (p === root) {
    return;
  }

  swap(arr, root, p);

  heapify(arr, p, size);
}

export const heap = (arr) => {
  const length = arr.length / 2 - 1;

  for (let i = length; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
};

export const heapSort = (arr) => {
  const length = arr.length - 1;

  heap(arr);

  for (let i = length; i >= 0; i--) {
    swap(arr, 0, i);
    heapify(arr, 0, i);
  }
};
