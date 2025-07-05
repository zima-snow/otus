import SingleArray from './SingleArray.js';
import VectorArray from './VectorArray.js';
import FactorArray from './FactorArray.js';
import PriorityQueue from './PriorityQueue.js';

class TestRunner {
  run = (array, total, name) => {
    if (typeof array.put !== 'function') {
      throw new Error('The provided array does not have a "put" method!');
    }

    if (typeof total !== 'number' || total < 0 || !Number.isInteger(total)) {
      throw new Error('"total" must be a non-negative integer!');
    }

    if (array.size !== undefined) {
      array.size = 0;
    } else if (Array.isArray(array.array)) {
      array.array = [];
    }

    console.time(`Algorithm time for ${name} array with ${total} elements`);

    for (let i = 0; i < total; i += 1) {
      array.put(i);
    }

    console.timeEnd(`Algorithm time for ${name} array with ${total} elements`);
    console.log('\n');
  };
}

const checkPriorityQueue = () => {
  console.log('Checking Priority Queue');

  const pq = new PriorityQueue();
  console.log('Enqueue low priority');
  pq.enqueue(1, 'Task 1 (Low)');

  console.log('Enqueue high priority');
  pq.enqueue(0, 'Task 0 (High)');

  console.log('Enqueue lowest priority');
  pq.enqueue(2, 'Task 2 (Lowest)');

  console.log('\nDequeue high priority');
  console.log(pq.dequeue());

  console.log('Dequeue low priority');
  console.log(pq.dequeue());

  console.log('Dequeue lowest priority');
  console.log(pq.dequeue());

  console.log('Queue is empty');
  console.log(pq.dequeue());
};

const main = () => {
  const testRunner = new TestRunner();

  try {
    const singleArray = new SingleArray();
    const vectorArray = new VectorArray(10);
    const factorArray = new FactorArray(2);

    testRunner.run(singleArray, 10000, 'single');
    testRunner.run(vectorArray, 10000, 'vector');
    testRunner.run(factorArray, 10000, 'factor');

    checkPriorityQueue();
  } catch (e) {
    console.error(e.message);
  }
};

main();
