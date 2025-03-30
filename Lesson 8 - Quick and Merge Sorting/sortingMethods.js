export const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const split = (arr, l, r) => {
  const pivot = arr[r];
  let m = l - 1;

  for (let j = l; j <= r; j += 1) {
    if (pivot >= arr[j]) {
      m += 1;

      if (m !== j) {
        swap(arr, m, j);
      }
    }
  }

  return m;
};

export const quickSort = (arr, l = 0, r = arr.length - 1) => {
  if (l >= r) {
    return;
  }

  let m = split(arr, l, r);
  quickSort(arr, l, m - 1);
  quickSort(arr, m + 1, r);

  return;
};

export const mergeSort = (arr) => {
  let step = 1;
  const length = arr.length;
  const auxiliary = Array.from({ length });

  while (step < length) {
    let index = 0;
    let l = 0;
    let m = l + step;
    let r = l + step * 2;

    do {
      m = m < length ? m : length;
      r = r < length ? r : length;

      let pointer1 = l;
      let pointer2 = m;
      
      while (pointer1 < m && pointer2 < r) {
        if (arr[pointer1] <= arr[pointer2]) {
          auxiliary[index++] = arr[pointer1++];
        } else {
          auxiliary[index++] = arr[pointer2++];
        }
      }

      while (pointer1 < m) {
        auxiliary[index++] = arr[pointer1++];
      }

      while (pointer2 < r) {
        auxiliary[index++] = arr[pointer2++];
      }

      l += step * 2;
      m += step * 2;
      r += step * 2;
    } while (l < length);

    for (let i = 0; i < length; i += 1) {
      arr[i] = auxiliary[i];
    }

    step *= 2;
  }
};
