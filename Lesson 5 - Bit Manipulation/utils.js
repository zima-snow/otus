import { prompt } from '../config.js';

const POSITIONS_NUMBERS = Array.from({ length: 64 }).fill(0).map((_, index) => index);

export const keyPress = async () => {
  return new Promise(async (resolve, reject) => {
    const positionNumber = await prompt(`Enter any number from ${POSITIONS_NUMBERS}\n`);

    if (POSITIONS_NUMBERS.includes(+positionNumber)) {
      return resolve(+positionNumber);
    };

    return reject(Error('Invalid number'));
  })
}
