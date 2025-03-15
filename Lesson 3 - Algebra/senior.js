import {
  pow,
  fibonacciRecursively,
  fibonacciIteratively,
  simpleNumbers,
} from './junior.js';

import {
  powRecursively,
  pow2,
  fibonacciGoldenRatio,
  fibonacciMatrix,
  simpleNumbersOptimized,
} from './middle.js';

const algorithms = {
  'pow_linear': {
    maxN: 1000,
    func: (n) => pow(2, n),
  },
  'pow_recursively': {
    maxN: 1000,
    func: (n) => powRecursively(2, n),
  },
  'pow_by_division': {
    maxN: 100000,
    func: (n) => pow2(2, n),
  },
  'fibonacci_recursively': {
    maxN: 10,
    func: fibonacciRecursively,
  },
  'fibonacci_iteratively': {
    maxN: 100,
    func: fibonacciIteratively,
  },
  'fibonacci_golden_ratio': {
    maxN: 1000,
    func: fibonacciGoldenRatio,
  },
  'fibonacci_matrix': {
    maxN: 1000,
    func: fibonacciMatrix,
  },
  'simple_numbers_linear': {
    maxN: 100000,
    func: simpleNumbers,
  },
  'simple_numbers_optimized': {
    maxN: 100000,
    func: simpleNumbersOptimized,
  },
};

class TestRunner {
  run = (name, algorithm) => {
    for (let n = 1; n <= algorithm.maxN; n *= 10) {
      console.time('Algorithm time');
      const result = algorithm.func(n);
      console.log(`Algorithm - name: ${name}; input n = ${n}; result: ${result}`);
      console.timeEnd('Algorithm time');
    }

    console.log('\n');
  };
}

const main = () => {
  const testRunner = new TestRunner();

  try {
    Object.entries(algorithms).forEach(([name, algorithm]) => {
      testRunner.run(name, algorithm);
    });
  } catch (e) {
    console.error(e.message);
  }
};

main();