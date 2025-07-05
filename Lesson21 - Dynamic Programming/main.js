import path from 'path';

import OneTwoPeaTestRunner from './OneTwoPea.js';
import FurTreeTestRunner from './FurTree.js';
import FiveEightTestRunner from './FiveEight.js';
import BigIslandTestRunner from './BigIsland.js';

const main = () => {
  const testRunnerOneTwoPea = new OneTwoPeaTestRunner(path.resolve('./tests/OneTwoPeas'));
  const testRunnerFurTree = new FurTreeTestRunner(path.resolve('./tests/FurTree'));
  const testRunnerFiveEight = new FiveEightTestRunner(path.resolve('./tests/FiveEight'));
  const testRunnerBigIsland = new BigIslandTestRunner(path.resolve('./tests/BigIsland'));

  try {
    // for (let i = 0; i < 10; i += 1) {
    //   testRunnerOneTwoPea.run(i, 'test');
    // }

    // for (let i = 0; i < 10; i += 1) {
    //   testRunnerFurTree.run(i, 'test');
    // }

    // for (let i = 0; i < 10; i += 1) {
    //   testRunnerFiveEight.run(i, 'test');
    // }

    for (let i = 0; i < 10; i += 1) {
      testRunnerBigIsland.run(i, 'test');
    }
  } catch (e) {
    console.error(e.message);
  }
};

main();
