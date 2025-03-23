import King from './King.js';

import { keyPress } from './utils.js';

const kingMoves = (positionNumber) => {
  const king = new King(positionNumber);
  king.steps();
  king.print();
};

const countUnitsInBinaryByDivision = (n) => {
  let count = 0;
  let current = n;

  while (current > 0) {
    current = Math.floor(current / 2);
    
    if (current % 2 !== 0) {
      count += 1;
    }
  }

  return count;
};

const countUnitsInBinaryByPower = (n) => {
  let count = 0;
  let current = n;

  while (current > 0) {
    let power = 0;

    while (Math.pow(2, power) <= current) {
      power += 1;
    }

    current -= Math.pow(2, power - 1);
    count += 1;
  }

  return count;
};

export const countUnitsInBinaryByBitMask = (n) => {
  let count = 0;
  let current = n;

  while (current > 0) {
    if (current & 0x01 > 0) {
      count += 1;
    }

    current = current >> 1;
  }

  return count;
};

const countUnitsInBinaryByKernigan = (n) => {
  let count = 0;
  let current = n;

  while (current > 0) {
    count += 1;
    current &= current - 1;
  }

  return count;
};

const main = () => {
  const resultCountUnitsInBinaryByDivision = countUnitsInBinaryByDivision(1234567890);
  console.log(resultCountUnitsInBinaryByDivision);

  const resultCountUnitsInBinaryByPower = countUnitsInBinaryByPower(1234567890);
  console.log(resultCountUnitsInBinaryByPower);

  const resultCountUnitsInBinaryBitMask = countUnitsInBinaryByBitMask(1234567890);
  console.log(resultCountUnitsInBinaryBitMask);

  const resultCountUnitsInBinaryByKernigan = countUnitsInBinaryByKernigan(1234567890);
  console.log(resultCountUnitsInBinaryByKernigan);

  Promise.resolve()
    .then(() => keyPress())
    .then((positionNumber) => {
      kingMoves(positionNumber);
    })
    .catch(e => console.error('Error', e))
};

main();
