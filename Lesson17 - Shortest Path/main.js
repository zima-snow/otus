import Graph from './Graph.js';

const main = () => {
  const adjacencyVector = [
    [1, 3], // 0: connected with 1 and 3
    [0, 2, 3, 4], // 1: connected with 0, 2, 3, 4
    [1, 4], // 2: connected with 1 and 4
    [0, 1, 4, 5], // 3: connected with 0, 1, 4, 5
    [1, 2, 3, 5], // 4: connected with 1, 2, 3, 5
    [3, 4], // 5: connected with 3 and 4
  ];

  const weights = [
    [1, 2], // edge's weight from 0
    [1, 4, 2, 1], // edge's weight from 1
    [4, 7], // edge's weight from 2
    [2, 2, 1, 2], // edge's weight from 3
    [1, 7, 1, 3], // edge's weight from 4
    [2, 3], // edge's weight from 5
  ];

  const graph = new Graph(adjacencyVector, adjacencyVector.length, weights);

  console.log('Graph without weights');
  graph.print();

  console.log('\nGraph with weights');
  graph.printWithWeights();

  try {
    const sp = graph.deikstra(0);

    console.log('The shortest path from 0 vertex (Deikstra):');

    sp.forEach((edge) => {
      console.log(`${edge.v1} -> ${edge.v2} (weight: ${edge.weight})`);
    });
  } catch (e) {
    console.error(e.message);
  }
};

main();
