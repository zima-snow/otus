import fs from 'fs';
import { performance } from 'perf_hooks';

import { generateFile, startSorting } from '../sortingInFiles.js';

const testCases = [
  { N: 100, T: 10 },     // 10^2, T=10
  { N: 100, T: 100 },    // 10^2, T=N
  { N: 1000, T: 10 },    // 10^3, T=10
  { N: 1000, T: 1000 },  // 10^3, T=N
  { N: 10000, T: 10 },   // 10^4, T=10
  { N: 10000, T: 10000 }, // 10^4, T=N
  { N: 100000, T: 10 },   // 10^5, T=10
  { N: 100000, T: 100000 }, // 10^5, T=N
  { N: 1000000, T: 10 },    // 10^6, T=10
  { N: 1000000, T: 1000000 } // 10^6, T=N
];

const testAlgorithm = async () => {
  for (const { N, T } of testCases) {
    console.log(`\nTesting N=${N}, T=${T}`);
    
    const inputFile = `input_${N}_${T}.txt`;
    const outputFile = 'sorted_output.txt';
    await generateFile(N, T, inputFile);

    const startTime = performance.now();
    await startSorting(T, inputFile, outputFile);
    const endTime = performance.now();

    await verifySorting(N, inputFile, outputFile);
    
    console.log(`Completed in ${(endTime - startTime).toFixed(2)} ms`);

    fs.unlinkSync(inputFile);
    fs.unlinkSync(outputFile);
  }
}

async function verifySorting(expectedCount, inputFile, outputFile) {
  const inputContent = fs.readFileSync(inputFile, 'utf8');
  const outputContent = fs.readFileSync(outputFile, 'utf8');
  
  const inputNumbers = inputContent.trim().split('\n').map(Number);
  const outputNumbers = outputContent.trim().split('\n').map(Number);

  if (outputNumbers.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} numbers, got ${outputNumbers.length}`);
  }

  for (let i = 1; i < outputNumbers.length; i++) {
    if (outputNumbers[i] < outputNumbers[i - 1]) {
      throw new Error(`Sorting error at position ${i}`);
    }
  }
  
  console.log(`Verification passed for N=${expectedCount}`);
}

testAlgorithm().catch(console.error);
