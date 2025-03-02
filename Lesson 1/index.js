import process from 'process';
import { prompt } from '../config.js';

import { NUMBERS_FOR_CONDITION, KEYS, CONDITIONS } from './consts.js';

const printPicture = (key) => {
  const condition = CONDITIONS[key];

  for (let x = 0; x < 25; x += 1) {
    for (let y = 0; y < 25; y += 1) {
      process.stdout.write(condition(x, y) ? '#   ' : '.   ');
    }

    console.log('\n');
  }
};

const keyPress = async () => {
  return new Promise(async (resolve, reject) => {
    const key = await prompt(`Enter any number from ${NUMBERS_FOR_CONDITION}\n`);

    if (KEYS.includes(+key)) {
      return resolve(key);
    };

    return reject(Error('Invalid number'));
  })
}

const main = () => {
  Promise.resolve()
    .then(() => keyPress())
    .then((key) => {
      printPicture(key);
    })
    .catch(e => console.error('Error', e))
};

main();
