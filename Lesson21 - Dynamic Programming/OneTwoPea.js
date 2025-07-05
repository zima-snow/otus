import fs from 'fs';
import path from 'path';

const gcd = (a, b) => {
  if (a === b) {
    return a;
  }

  const diff = Math.abs(a - b);
  const min = Math.min(a, b);

  return gcd(diff, min);
};

export const oneTwoPea = (a, b, c, d) => {
  const numerator = a * d + b * c;
  const denominator = b * d;

  const GCD = gcd(numerator, denominator);

  const result1 = numerator / GCD;
  const result2 = denominator / GCD;

  return `${result1}/${result2}`;
};

class OneTwoPeaTestRunner {
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

    const input = fs.readFileSync(testPathInput, 'utf8').trim();

    const match = input.match(/^(\d+)\/(\d+)\+(\d+)\/(\d+)$/);

    if (!match) {
      throw new Error('Wrong format: expected "digit/digit+digit/digit"');
    }

    const [, a_str, b_str, c_str, d_str] = match;

    const a = Number(a_str);
    const b = Number(b_str);
    const c = Number(c_str);
    const d = Number(d_str);

    const result = oneTwoPea(a, b, c, d);
    const expected = fs.readFileSync(testPathOutput, 'utf8').trim();

    if (result.trim() === expected) {
      console.log('✅ Test passed:', result);
    } else {
      console.error('❌ Test failed!');
      console.error('   Expected:', expected);
      console.error('   Got:', result);
    }
  };
}

export default OneTwoPeaTestRunner;
