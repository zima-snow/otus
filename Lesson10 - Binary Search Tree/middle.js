import AVLTree from './AVLTree.js';
import { generateArray } from './utils.js';

const insertAVL = (avl, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    avl.insert(arr[i]);
  }
};

const searchAVL = (avl, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    avl.search(arr[i]);
  }
};

const removeAVL = (avl, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    avl.remove(arr[i]);
  }
};

const main = () => {
  const avl = new AVLTree();

  for (let n = 100; n <= 10000000; n *= 10) {
    const arr = generateArray(n);

    console.time(`Insert in AVL ${n} random nodes`);
    insertAVL(avl, arr, n);
    console.timeEnd(`Insert in AVL ${n} random nodes`);

    console.time(`Search in AVL ${n / 10} random nodes`);
    searchAVL(avl, arr, n / 10);
    console.timeEnd(`Search in AVL ${n / 10} random nodes`);

    console.time(`Remove in AVL ${n / 10} random nodes`);
    removeAVL(avl, arr, n / 10);
    console.timeEnd(`Remove in AVL ${n / 10} random nodes`);
  }

  for (let n = 100; n <= 10000000; n *= 10) {
    const arr = Array.from({ length: n }, (_, index) => index + 1);

    console.time(`Insert in AVL ${n} increase nodes`);
    insertAVL(avl, arr, n);
    console.timeEnd(`Insert in AVL ${n} increase nodes`);

    console.time(`Search in AVL ${n / 10} increase nodes`);
    searchAVL(avl, arr, n / 10);
    console.timeEnd(`Search in AVL ${n / 10} increase nodes`);

    console.time(`Remove in AVL ${n / 10} increase nodes`);
    removeAVL(avl, arr, n / 10);
    console.timeEnd(`Remove in AVL ${n / 10} increase nodes`);
  }
};

main();
