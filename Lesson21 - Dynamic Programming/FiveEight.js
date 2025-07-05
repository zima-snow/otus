import fs from 'fs';
import path from 'path';

export const fiveEight = (N) => {
  let x5 = 1n,
    x55 = 0n,
    x8 = 1n,
    x88 = 0n;

  for (let i = 2n; i <= N; i++) {
    const newX5 = x8 + x88;
    const newX55 = x5;
    const newX8 = x5 + x55;
    const newX88 = x8;

    x5 = newX5;
    x55 = newX55;
    x8 = newX8;
    x88 = newX88;
  }

  return x5 + x55 + x8 + x88;
};

class FiveEightTestRunner {
  testsFolderPath = '';

  constructor(folderPath) {
    this.testsFolderPath = folderPath;
  }

  run = (testNumber, name) => {
    const testPathInput = path.resolve(
      this.testsFolderPath,
      `${name}.${testNumber}.in`
    );

    const outputName = `${name}.${testNumber}.out`;
    const testPathOutput = path.resolve(this.testsFolderPath, outputName);

    const N = fs.readFileSync(testPathInput, 'utf8').trim();

    const result = fiveEight(N);
    const expected = fs.readFileSync(testPathOutput, 'utf8').trim();

    if (result.toString() === expected) {
      console.log('✅ Test passed:', result.toString());
    } else {
      console.error('❌ Test failed!');
      console.error('   Expected:', expected);
      console.error('   Got:', result);
    }
  };
}

export default FiveEightTestRunner;
