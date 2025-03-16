import SingleArray from './SingleArray.js';
import VectorArray from './VectorArray.js';
import FactorArray from './FactorArray.js';

class TestRunner {
  run = (array, total, name) => {
    console.time(`Algorithm time for ${name} array`);
   
    for (let i = 0; i < total; i += 1) {
      array.put(i);
    }

    console.timeEnd(`Algorithm time for ${name} array`);
    console.log('\n');
  };
}

const main = () => {
  const testRunner = new TestRunner();

  try {
    const singleArray = new SingleArray();
    const vectorArray = new VectorArray(10);
    const factorArray = new FactorArray(2);

    testRunner.run(singleArray, 10000, 'single');
    testRunner.run(vectorArray, 10000, 'vector');
    testRunner.run(factorArray, 10000, 'factor');
  } catch (e) {
    console.error(e.message);
  }
};

main();
