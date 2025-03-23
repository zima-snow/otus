import fs from 'fs';
import path from 'path';

import King from './King.js';

class TestRunner {
  testsFolderPath = '';

  constructor(folderPath) {
    this.testsFolderPath = folderPath;
  }

  run = (testNumber) => {
    const testPathInput = path.resolve(this.testsFolderPath, `test.${testNumber}.in`);
    const testPathOutput = path.resolve(this.testsFolderPath, `test.${testNumber}.out`);

    const input = fs.readFileSync(testPathInput, 'utf8').trim();
    const expected = fs.readFileSync(testPathOutput, 'utf8').split('\r\n');
    
    const king = new King(+input);
    king.steps();
    const movesCount = king.countUnitsInBinary(king.bb);

    if (movesCount !== +expected[0]) {
      const errorMessage =
        `Test with number ${testNumber} failed: Expected moves value - ${expected[0]}, Actual moves value - ${movesCount}`;
      throw Error(errorMessage);
    }

    if (king.bb !== BigInt(expected[1])) {
      const errorMessage =
        `Test with number ${testNumber} failed: Expected bitmask value - ${expected[1]}, Actual bitmask value - ${king.bb}`;
      throw Error(errorMessage);
    }

    console.log(
      `Test with number ${testNumber} accepted: Expected and Actual values are ${expected[0]} (moves) and ${expected[1]} (bitmask)`
    );
  };
}

const main = () => {
  const testsCount = 10;
  const testKingRunner = new TestRunner(path.resolve('./Tests/king'));

  try {
    for (let i = 0; i < testsCount; i += 1) {
      testKingRunner.run(i);
    }
  } catch (e) {
    console.error(e.message);
  }
};

main();
