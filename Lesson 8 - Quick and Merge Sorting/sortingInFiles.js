import fs from 'fs';
import readline from 'readline';

import { mergeSort } from './sortingMethods.js';

export const generateFile = async (n, t, fileName) => {
  const writeStream = fs.createWriteStream(fileName);
  
  for (let i = 0; i < n; i++) {
    const randomNum = Math.floor(Math.random() * t) + 1;

    if (!writeStream.write(`${randomNum}\n`)) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
}

  writeStream.end();

  await new Promise(resolve => writeStream.on('finish', resolve));
  console.log(`Input file ${fileName} is generated (${n} numbers from 1 to ${t})`);
};

const getTempFiles = async (inputFile, t) => {
  const tempFiles = [];

  for (let i = 0; i < t; i++) {
    tempFiles.push(`temp_${i}.txt`);
    fs.writeFileSync(tempFiles[i], '');
  }

  const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
  const reader = readline.createInterface({ input: readStream });
    
  let currentFile = 0;
  for await (const line of reader) {
    const num = parseInt(line.trim());

    if (!isNaN(num)) {
      fs.appendFileSync(tempFiles[currentFile], `${num}\n`);
      currentFile = (currentFile + 1) % t;
    }
  }

  return tempFiles;
};

const mergeTempFiles = async (outputFile, writers) => {
  const writeStream = fs.createWriteStream(outputFile);

  while (true) {
    let min = Infinity;
    let minWriterIndex = -1;

    for (let i = 0; i < writers.length; i++) {
      const writer = writers[i];

      if (writer.index < writer.numbers.length && writer.numbers[writer.index] < min) {
        min = writer.numbers[writer.index];
        minWriterIndex = i;
      }
    }
    
    if (minWriterIndex === -1) break;

    if (!writeStream.write(`${min}\n`)) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
    
    writers[minWriterIndex].index++;
  }

  writeStream.end();
  await new Promise(resolve => writeStream.on('finish', resolve));
};

export const startSorting = async (t, inputFile, outputFile) => {
  const tempFiles = await getTempFiles(inputFile, t);

  for (const file of tempFiles) {
    const numbers = fs.readFileSync(file, 'utf8')
      .split('\n')
      .filter(x => x)
      .map(Number)
    
    mergeSort(numbers);
    
    fs.writeFileSync(file, numbers.join('\n') + '\n');
  }

  const writers = tempFiles.map(file => {
    const numbers = fs.readFileSync(file, 'utf8')
      .split('\n')
      .filter(x => x)
      .map(Number);

    return { numbers, index: 0 };
  });

  mergeTempFiles(outputFile, writers);

  for (const file of tempFiles) {
    fs.unlinkSync(file);
  }

  console.log(`Sorting completed. Result in file ${outputFile}`);
};
