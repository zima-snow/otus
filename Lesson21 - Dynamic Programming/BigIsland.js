import fs from 'fs';
import path from 'path';

const dfs = (grid, i, j, N) => {
  // Проверка границ и значения клетки
  if (i < 0 || j < 0 || i >= N || j >= N || grid[i][j] !== 1) {
    return;
  }

  // Помечаем клетку как посещённую (0)
  grid[i][j] = 0;

  // Рекурсивно проверяем соседей
  dfs(grid, i + 1, j, N); // Вниз
  dfs(grid, i - 1, j, N); // Вверх
  dfs(grid, i, j + 1, N); // Вправо
  dfs(grid, i, j - 1, N); // Влево
};

const bigIsland = (grid, N) => {
  let count = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === 1) {
        count++;
        dfs(grid, i, j, N);
      }
    }
  }

  return count;
};

class BigIslandTestRunner {
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

    const input = fs.readFileSync(testPathInput, 'utf8').trim().split('\n');
    const N = parseInt(input[0]);
    const grid = [];

    for (let i = 1; i <= N; i++) {
      const row = input[i].trim().split(/\s+/).map(Number);
      grid.push(row);
    }

    const result = bigIsland(grid, N);
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

export default BigIslandTestRunner;
