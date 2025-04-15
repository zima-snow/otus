import SplayTree from './SplayTree.js';
import RandomTree from './RandomTree.js';
import { generateArray } from './utils.js';

const insertSplay = (splay, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    splay.splayInsert(arr[i]);
  }
};

const searchSplay = (splay, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    splay.splaySearch(arr[i]);
  }
};

const insertRandom = (random, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    random.randomInsert(arr[i]);
  }
};

const searchRandom = (random, arr, n) => {
  for (let i = 0; i < n; i += 1) {
    random.randomSearch(arr[i]);
  }
};

const main = () => {
  const splay = new SplayTree();

  for (let n = 100; n <= 10000000; n *= 10) {
    const arr = generateArray(n);

    console.time(`Insert in Splay Tree ${n} random nodes`);
    insertSplay(splay, arr, n);
    console.timeEnd(`Insert in Splay Tree ${n} random nodes`);

    console.time(`Search in Splay Tree ${n / 10} random nodes`);
    searchSplay(splay, arr, n / 10);
    console.timeEnd(`Search in Splay Tree ${n / 10} random nodes`);
  }

  for (let n = 100; n <= 10000000; n *= 10) {
    const arr = Array.from({ length: n }, (_, index) => index + 1);

    console.time(`Insert in Splay Tree ${n} increase nodes`);
    insertSplay(splay, arr, n);
    console.timeEnd(`Insert in Splay Tree ${n} increase nodes`);

    console.time(`Search in Splay Tree ${n / 10} increase nodes`);
    searchSplay(splay, arr, n / 10);
    console.timeEnd(`Search in Splay Tree ${n / 10} increase nodes`);
  }

  const random = new RandomTree();

  for (let n = 100; n <= 10000000; n *= 10) {
    const arr = generateArray(n);

    console.time(`Insert in Random Tree ${n} random nodes`);
    insertRandom(random, arr, n);
    console.timeEnd(`Insert in Random Tree ${n} random nodes`);

    console.time(`Search in Random Tree ${n / 10} random nodes`);
    searchRandom(random, arr, n / 10);
    console.timeEnd(`Search in Random Tree ${n / 10} random nodes`);
  }

  for (let n = 100; n <= 10000000; n *= 10) {
    const arr = Array.from({ length: n }, (_, index) => index + 1);

    console.time(`Insert in Random Tree ${n} increase nodes`);
    insertRandom(random, arr, n);
    console.timeEnd(`Insert in Random Tree ${n} increase nodes`);

    console.time(`Search in Random Tree ${n / 10} increase nodes`);
    searchRandom(random, arr, n / 10);
    console.timeEnd(`Search in Random Tree ${n / 10} increase nodes`);
  }
};

main();
