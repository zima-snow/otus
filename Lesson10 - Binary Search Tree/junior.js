import BinarySearchTree from './BinarySearchTree.js';
import { generateArray } from './utils.js';

const insertBST = (bst, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    bst.insert(arr[i]);
  }
};

const searchBST = (bst, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    bst.search(arr[i]);
  }
};

const removeBST = (bst, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    bst.remove(arr[i]);
  }
};

const main = () => {
  const bst = new BinarySearchTree();

  for (let n = 100; n <= 10000000; n *= 10) {
    const arr = generateArray(n);

    console.time(`Insert in BST ${n} random nodes`);
    insertBST(bst, arr, n);
    console.timeEnd(`Insert in BST ${n} random nodes`);

    console.time(`Search in BST ${n / 10} random nodes`);
    searchBST(bst, arr, n / 10);
    console.timeEnd(`Search in BST ${n / 10} random nodes`);

    console.time(`Remove in BST ${n / 10} random nodes`);
    removeBST(bst, arr, n / 10);
    console.timeEnd(`Remove in BST ${n / 10} random nodes`);
  }

  for (let n = 100; n <= 10000000; n *= 10) {
    const arr = Array.from({ length: n }, (_, index) => index + 1);

    console.time(`Insert in BST ${n} increase nodes`);
    insertBST(bst, arr, n);
    console.timeEnd(`Insert in BST ${n} increase nodes`);

    console.time(`Search in BST ${n / 10} increase nodes`);
    searchBST(bst, arr, n / 10);
    console.timeEnd(`Search in BST ${n / 10} increase nodes`);

    console.time(`Remove in BST ${n / 10} increase nodes`);
    removeBST(bst, arr, n / 10);
    console.timeEnd(`Remove in BST ${n / 10} increase nodes`);
  }
};

main();
