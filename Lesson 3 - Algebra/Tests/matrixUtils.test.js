import MatrixUtils from '../matrixUtils.js';

const matrixUtils = new MatrixUtils();

const m1 = [[1, 2], [3, 4]];
const m2 = [[5, 6], [7, 8]];
const mLength = m1.length;

const expected = [[19, 22], [43, 50]];

const testMultiply = () => {
  const result = matrixUtils.multiply(m1, m2);
  console.log('EXPECTED:');
  console.log(expected);
  console.log('RESULT:');
  console.log(result);

  let testPassed = true;

  for (let i = 0; i < mLength; i += 1) {
    for (let j = 0; j < mLength; j += 1) {
      if (result[i][j] !== expected[i][j]) {
        testPassed = false;
        break;
      }
    }
  }

  console.log(`testMultiply is ${testPassed ? 'passed' : 'not passed'} \n`);
};

testMultiply();

const expectedIdentityMatrix = [[1, 0, 0], [0, 1, 0], [0, 0 , 1]];
const identityMatrixLength = expectedIdentityMatrix.length;

const testGetIdentityMatrix = () => {
  const result = matrixUtils.getIdentityMatrix(identityMatrixLength);
  console.log('EXPECTED:');
  console.log(expectedIdentityMatrix);
  console.log('RESULT:');
  console.log(result);

  let testPassed = true;

  for (let i = 0; i < identityMatrixLength; i += 1) {
    for (let j = 0; j < identityMatrixLength; j += 1) {
      if (result[i][j] !== expectedIdentityMatrix[i][j]) {
        testPassed = false;
        break;
      }
    }
  }

  console.log(`testGetIdentityMatrix is ${testPassed ? 'passed' : 'not passed'} \n`);
};

testGetIdentityMatrix();

const matrixForPow = [[1, 2], [2, 3]];
const expectedMatrixForPow = [[5, 8], [8, 13]];
const matrixPowLength = matrixForPow.length;

const testMatrixPow = () => {
  const result = matrixUtils.pow(matrixForPow, 2);
  console.log('EXPECTED:');
  console.log(expectedMatrixForPow);
  console.log('RESULT:');
  console.log(result);

  let testPassed = true;

  for (let i = 0; i < matrixPowLength; i += 1) {
    for (let j = 0; j < matrixPowLength; j += 1) {
      if (result[i][j] !== expectedMatrixForPow[i][j]) {
        testPassed = false;
        break;
      }
    }
  }

  console.log(`testMatrixPow is ${testPassed ? 'passed' : 'not passed'} \n`);
};

testMatrixPow();
