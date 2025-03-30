import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Worker, isMainThread, parentPort } from 'worker_threads';

import {
  quickSort,
  mergeSort,
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

  run = async (testNumber, name, type, heavyTask) => {
    const testPathInput = path.resolve(this.testsFolderPath, `test.${testNumber}.in`);

    const outputName = `${name}.${testNumber}.${type}.out`;
    const testPathOutput = path.resolve(this.testsFolderPath, outputName);

    const array = await this.getArray(testPathInput);

    console.time(`${name} sorting time for ${type} items with length ${array.length}`);

    heavyTask(array);

    console.timeEnd(`${name} sorting time for ${type} items with length ${array.length}`);

    this.exportData(testPathOutput, array);
  };
}

if (isMainThread) {
  // Main thread
  const runWorker = () => {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./senior.js', {
        resourceLimits: {
          maxOldGenerationSizeMb: 1024,
          maxYoungGenerationSizeMb: 256,
          codeRangeSizeMb: 128,
          stackSizeMb: 512
        }
      });
      
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }
  
  (async () => {
    try {
      await runWorker();
    } catch (e) {
      console.error(e.message);
    }
  })();
} else {
  // Worker thread  
  const testRunnerRandom = new TestRunner(path.resolve('../Lesson\ 7\ -\ Base\ Sorting\ 2/Tests/0.random'));
  const testRunnerDigits = new TestRunner(path.resolve('../Lesson\ 7\ -\ Base\ Sorting\ 2/Tests/1.digits'));
  const testRunnerSorted = new TestRunner(path.resolve('../Lesson\ 7\ -\ Base\ Sorting\ 2/Tests/2.sorted'));
  const testRunnerRevers = new TestRunner(path.resolve('../Lesson\ 7\ -\ Base\ Sorting\ 2/Tests/3.revers'));

  for (let i = 0; i < 8; i += 1) {
    await testRunnerRandom.run(i, 'quick', 'random', quickSort);
    await testRunnerDigits.run(i, 'quick', 'digits', quickSort);
    await testRunnerSorted.run(i, 'quick', 'sorted', quickSort);
    await testRunnerRevers.run(i, 'quick', 'revers', quickSort);
  }

  for (let i = 0; i < 8; i += 1) {
    await testRunnerRandom.run(i, 'merge', 'random', mergeSort);
    await testRunnerDigits.run(i, 'merge', 'digits', mergeSort);
    await testRunnerSorted.run(i, 'merge', 'sorted', mergeSort);
    await testRunnerRevers.run(i, 'merge', 'revers', mergeSort);
  }

  parentPort.postMessage(true);
}