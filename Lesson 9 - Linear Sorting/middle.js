import fs from 'fs';
import { performance } from 'perf_hooks';

import { generateBinaryFile } from './utils.js';

const MAX_COUNTER_SIZE = 65536;
const MB = 1024 * 1024;

const sortBinaryFile = async (inputFile, outputFile, checkSortingResult) => {
  const startTime = performance.now();

  const fileSize = fs.statSync(inputFile).size;
  const count = fileSize / 2;
  console.log(`Sorting ${count} numbers...`);

  const counter = new Uint32Array(MAX_COUNTER_SIZE);

  const readStream = fs.createReadStream(inputFile, {
    highWaterMark: 64 * MB,
  });

  for await (const chunk of readStream) {
    for (let i = 0; i < chunk.length; i += 2) {
      const num = chunk.readUInt16LE(i);
      counter[num]++;
    }
  }

  console.log('Counting completed, writing result...');

  const writeStream = fs.createWriteStream(outputFile);
  const buffer = Buffer.alloc(2);

  for (let num = 0; num < MAX_COUNTER_SIZE; num++) {
    for (let j = 0; j < counter[num]; j++) {
      buffer.writeUInt16LE(num, 0);

      if (!writeStream.write(buffer)) {
        await new Promise((resolve) => writeStream.once('drain', resolve));
      }
    }
  }

  writeStream.end();

  writeStream.on('finish', () => {
    console.log('Sorting completed!');

    const endTime = performance.now();
    const duration = (endTime - startTime) / 1000;
    console.log(`Sorting took ${duration.toFixed(3)} seconds`);

    checkSortingResult();
  });
};

const checkSortedFile = (file) => {
  const data = fs.readFileSync(file);
  let hasError = false;

  for (let i = 0; i < data.length - 2; i += 2) {
    const current = data.readUInt16LE(i);
    const next = data.readUInt16LE(i + 2);

    if (current > next) {
      hasError = true;
      break;
    }
  }

  if (hasError) {
    console.error(`File is not sorted at position ${i}: ${current} > ${next}`);
  } else {
    console.log('File is sorted!');
  }
};

const main = () => {
  const inputFile = 'numbers.bin';
  const outputFile = 'numbers_sorted.bin';
  const countE7 = 1e7;
  const countE8 = 1e8;

  generateBinaryFile(inputFile, countE7, () => {
    sortBinaryFile(inputFile, outputFile, () => {
      checkSortedFile(outputFile);
    });
  });

  generateBinaryFile(inputFile, countE8, () => {
    sortBinaryFile(inputFile, outputFile, () => {
      checkSortedFile(outputFile);
    });
  });
};

main();
