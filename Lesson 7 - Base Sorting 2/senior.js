import fs from 'fs';
import path from 'path';
import readline from 'readline';

import {
  selectionSort,
  heapSort,
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
      case 'selection': {
        selectionSort(array);
        break;
      }
      case 'heap': {
        heapSort(array);
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
      await testRunnerRandom.run(i, 'selection', 'random');
      await testRunnerDigits.run(i, 'selection', 'digits');
      await testRunnerSorted.run(i, 'selection', 'sorted');
      await testRunnerRevers.run(i, 'selection', 'revers');
    }

    for (let i = 0; i < 8; i += 1) {
      await testRunnerRandom.run(i, 'heap', 'random');
      await testRunnerDigits.run(i, 'heap', 'digits');
      await testRunnerSorted.run(i, 'heap', 'sorted');
      await testRunnerRevers.run(i, 'heap', 'revers');
    }
  } catch (e) {
    console.error(e.message);
  }
};

main();
