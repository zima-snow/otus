import fs from 'fs';
import path from 'path';

export const furTree = (tree, N) => {
  let dp = [...tree[N - 1]];

  for (let i = N - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[j] = tree[i][j] + Math.max(dp[j], dp[j + 1]);
    }

    dp.pop();
  }

  return dp[0];
};

const getTree = (filename) => {
  const data = fs.readFileSync(filename, 'utf-8').split('\n');
  const N = parseInt(data[0].trim());
  const tree = [];

  // Парсинг ёлочки
  for (let i = 1; i <= N; i++) {
    const row = data[i]
      .trim() // Удаляем пробелы в начале и конце
      .split(/\s+/) // Разбиваем по любым пробелам
      .map(Number); // Преобразуем в числа

    tree.push(row);
  }

  return [tree, N];
};

class FurTreeTestRunner {
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

    const [tree, N] = getTree(testPathInput);
    const result = furTree(tree, N);
    const expected = fs.readFileSync(testPathOutput, 'utf8').trim();

    if (result.toString() === expected) {
      console.log('✅ Test passed:', result);
    } else {
      console.error('❌ Test failed!');
      console.error('   Expected:', expected);
      console.error('   Got:', result);
    }
  };
}

export default FurTreeTestRunner;
