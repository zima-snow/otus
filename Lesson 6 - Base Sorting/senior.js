import fs from 'fs';
import path from 'path';
import readline from 'readline';

import {
  bubbleSort,
  insertionSort,
  shellSort,
  bubbleSortOptimized,
  insertionSortWithShift,
  shellSortGapByKnuth,
  shellSortGapBySendewick,
} from './sortingMethods.js';

class TestRunner {
  testsFolderPath = '';

  constructor(folderPath) {
    this.testsFolderPath = folderPath;
  }

  getArray = async (pathToFile) => {
    const readable = fs.createReadStream(pathToFile);
    const reader = readline.createInterface({ input: readable, crlfDelay: Infinity });

    let isFirstLine = true;

    const array = await new Promise((resolve) => {
      let arrayFromFile;

      reader.on('line', (line) => {
        if (isFirstLine) {
          isFirstLine = false;
        } else {
          arrayFromFile = line.toString().split(" ");
          resolve(arrayFromFile.map(Number));
        }
      });
    });

    return array;
  }

  exportData = (pathToFile, array) => {
    const data = array.join(' ');

    try {
      fs.writeFileSync(pathToFile, data);
    } catch (err) {
      console.error('Error writing to file:', err);
    }
  }

  run = async (testNumber, name, type) => {
    const testPathInput = path.resolve(this.testsFolderPath, `test.${testNumber}.in`);

    const outputName = `${name}.${testNumber}.${type}.out`;
    const testPathOutput = path.resolve(this.testsFolderPath, outputName);

    const array = await this.getArray(testPathInput);

    console.time(`${name} sorting time for ${type} items with length ${array.length}`);
    
    switch (name) {
      case 'bubble': {
        bubbleSort(array);
        break;
      }
      case 'insertion': {
        insertionSort(array);
        break;
      }
      case 'shell': {
        shellSort(array);
        break;
      }
      case 'bubbleOptimized': {
        bubbleSortOptimized(array);
        break;
      }
      case 'insertionWithShift': {
        insertionSortWithShift(array);
        break;
      }
      case 'shellGapByKnuth': {
        shellSortGapByKnuth(array);
        break;
      }
      case 'shellGapBySedgewick': {
        shellSortGapBySendewick(array);
        break;
      }
      default: {
        break;
      }
    }

    console.timeEnd(`${name} sorting time for ${type} items with length ${array.length}`);

    this.exportData(testPathOutput, array);
  };
}

const main = async () => {
  const testRunnerRandom = new TestRunner(path.resolve('./Tests/0.random'));
  const testRunnerDigits = new TestRunner(path.resolve('./Tests/1.digits'));
  const testRunnerSorted = new TestRunner(path.resolve('./Tests/2.sorted'));
  const testRunnerRevers = new TestRunner(path.resolve('./Tests/3.revers'));

  try {
    for (let i = 0; i < 6; i += 1) {
      await testRunnerRandom.run(i, 'bubble', 'random');
      await testRunnerDigits.run(i, 'bubble', 'digits');
      await testRunnerSorted.run(i, 'bubble', 'sorted');
      await testRunnerRevers.run(i, 'bubble', 'revers');
    }

    for (let i = 0; i < 7; i += 1) {
      await testRunnerRandom.run(i, 'insertion', 'random');
      await testRunnerDigits.run(i, 'insertion', 'digits');
      await testRunnerSorted.run(i, 'insertion', 'sorted');
      await testRunnerRevers.run(i, 'insertion', 'revers');
    }

    for (let i = 0; i < 8; i += 1) {
      await testRunnerRandom.run(i, 'shell', 'random');
      await testRunnerDigits.run(i, 'shell', 'digits');
      await testRunnerSorted.run(i, 'shell', 'sorted');
      await testRunnerRevers.run(i, 'shell', 'revers');
    }

    for (let i = 0; i < 6; i += 1) {
      await testRunnerRandom.run(i, 'bubbleOptimized', 'random');
      await testRunnerDigits.run(i, 'bubbleOptimized', 'digits');
      await testRunnerSorted.run(i, 'bubbleOptimized', 'sorted');
      await testRunnerRevers.run(i, 'bubbleOptimized', 'revers');
    }

    for (let i = 0; i < 7; i += 1) {
      await testRunnerRandom.run(i, 'insertionWithShift', 'random');
      await testRunnerDigits.run(i, 'insertionWithShift', 'digits');
      await testRunnerSorted.run(i, 'insertionWithShift', 'sorted');
      await testRunnerRevers.run(i, 'insertionWithShift', 'revers');
    }

    for (let i = 0; i < 8; i += 1) {
      await testRunnerRandom.run(i, 'shellGapByKnuth', 'random');
      await testRunnerDigits.run(i, 'shellGapByKnuth', 'digits');
      await testRunnerSorted.run(i, 'shellGapByKnuth', 'sorted');
      await testRunnerRevers.run(i, 'shellGapByKnuth', 'revers');
    }

    for (let i = 0; i < 8; i += 1) {
      await testRunnerRandom.run(i, 'shellGapBySedgewick', 'random');
      await testRunnerDigits.run(i, 'shellGapBySedgewick', 'digits');
      await testRunnerSorted.run(i, 'shellGapBySedgewick', 'sorted');
      await testRunnerRevers.run(i, 'shellGapBySedgewick', 'revers');
    }
  } catch (e) {
    console.error(e.message);
  }
};

main();
