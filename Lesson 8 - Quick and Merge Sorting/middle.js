import { generateFile, startSorting } from './sortingInFiles.js';

const main = async () => {
  let t = 10;

  for (let n = 100; n <= 1000000; n *= 10) {
    await generateFile(n, t, 'input.txt');
    await startSorting(t, 'input.txt', 'sorted_output.txt');

    t *= 10;
  }
};

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e.message);
  }
})();
