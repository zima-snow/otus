import fs from 'fs';
import crypto from 'crypto';

import { BloomFilter } from './BloomFilter.js';

const generateDataset = (basePasswords, size = 10000) => {
  const dataset = [...basePasswords];

  while (dataset.length < size) {
    const num = Math.floor(Math.random() * 1000000);
    dataset.push(`password${num}`);
    dataset.push(`qwerty${num}`);
    dataset.push(`${num}abc`);
  }

  return dataset.slice(0, size);
};

// Загрузка реального датасета паролей
const loadDataset = async () => {
  try {
    const data = fs
      .readFileSync('rockyou.txt', 'utf-8')
      .split('\n')
      .filter(Boolean)
      .slice(0, 1_000_000);

    return data;
  } catch (error) {
    console.error('Error loading dataset, using fallback');
    return generateDataset([], 10000);
  }
}

const main = async () => {
  console.time('Load Data');
  const dataset = await loadDataset();
  console.timeEnd('Load Data');

  const bloomFilter = new BloomFilter(dataset.length * 10, 5);

  console.log(`Inserting ${dataset.length} items...`);
  console.time('Insertion');
  dataset.forEach((item) => bloomFilter.add(item));
  console.timeEnd('Insertion');

  const testWords = [
    '123456',
    'password',
    'qwerty',
    'sunshine',
    'superman',
    'notexist123',
    crypto.randomUUID(),
  ];

  console.log('\nTesting:');

  testWords.forEach((test) => {
    const result = bloomFilter.mightContain(test);
    const actual = dataset.includes(test);

    console.log(
      `Password: "${test}" | ` +
        `Filter: ${result} | ` +
        `Actual: ${actual} | ` +
        `${result === actual ? 'OK' : result ? 'False Positive' : 'Not Found'}`
    );
  });

  // Проверка ложных срабатываний
  console.log('\nТест ложных срабатываний:');

  let falsePositives = 0;
  const randomTests = Array.from({ length: 1000 }, () =>
    crypto.randomBytes(8).toString('hex')
  );

  randomTests.forEach((test) => {
    if (bloomFilter.mightContain(test) && !dataset.includes(test)) {
      falsePositives++;
    }
  });

  console.log(
    `False Positive: ${falsePositives}/1000 ` +
      `(${(falsePositives / 10).toFixed(2)}%)`
  );

  // Тест производительности
  console.log('');
  console.time('Bloom filter 1000 lookups');

  for (let i = 0; i < 1000; i++) {
    bloomFilter.mightContain(testWords[i % testWords.length]);
  }

  console.timeEnd('Bloom filter 1000 lookups');
};

main();
