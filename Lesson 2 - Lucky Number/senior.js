import fs from 'fs';
import path from 'path';

const getLuckyTicketsCount = (n) => {
  const base = 9;
  let sums = Array.from({ length: 10 }).fill(1n);

  const next = (counter) => {
    if (counter > n) {
      return;
    }

    const length = base * counter;
    const newSums = Array.from({ length: length + 1 }).fill(0n);

    for (let i = 0; i <= base; i += 1) {
      for (let j = 0; j <= length; j += 1) {
        const leftEdgeForNoZero = i;
        const rightEdgeForNoZero = i + base * (counter - 1);

        const condition = j >= leftEdgeForNoZero && j <= rightEdgeForNoZero;
        const value = condition ? sums[j - i] : 0n;

        newSums[j] = newSums[j] + value;
      }
    }

    sums = newSums;

    next(counter + 1);
  };

  next(1);

  return sums.reduce((acc, item) => acc + item * item, 0n);
}

class TestRunner {
  testsFolderPath = '';

  constructor(folderPath) {
    this.testsFolderPath = folderPath;
  }

  run = (testNumber) => {
    const testPathInput = path.resolve(this.testsFolderPath, `test.${testNumber}.in`);
    const testPathOutput = path.resolve(this.testsFolderPath, `test.${testNumber}.out`);

    const input = fs.readFileSync(testPathInput, 'utf8').trim();
    const expected = fs.readFileSync(testPathOutput, 'utf8').trim();
    const actual = getLuckyTicketsCount(Number(input));

    if (actual === BigInt(expected)) {
      console.log(`Test with number ${testNumber} accepted: Expected and Actual values are ${expected}`);
    } else {
      const errorMessage =
        `Test with number ${testNumber} failed: Expected value - ${expected}, Actual value - ${actual}`;
      throw Error(errorMessage);
    }
  };
}

const main = () => {
  const testsCount = 10;
  const testRunner = new TestRunner(path.resolve('./Tests'));

  try {
    for (let i = 0; i < testsCount; i += 1) {
      testRunner.run(i);
    }
  } catch (e) {
    console.error(e.message);
  }
};

main();
