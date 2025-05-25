import Graph from './Graph.js';

const main = () => {
  const adjacencyVector = [
    [1, 2, 3], // Vertex 0 connected with 1, 2, 3
    [0, 3], // Vertex 1 connected with 0, 3
    [0, 3], // Vertex 2 connected with 0, 3
    [0, 1, 2], // Vertex 3 connected with 0, 1, 2
  ];

  const weights = [
    [2, 6, 5], // Edge's weight from 0: 0-1=2, 0-2=6, 0-3=5
    [2, 3], // Edge's weight from: 1-0=2, 1-3=3
    [6, 4], // Edge's weight from: 2-0=6, 2-3=4
    [5, 3, 4], // Edge's weight from: 3-0=5, 3-1=3, 3-2=4
  ];

  const graph = new Graph(adjacencyVector, adjacencyVector.length, weights);

  console.log('Graph without weights');
  graph.print();

  console.log('\nGraph with weights');
  graph.printWithWeights();

  try {
    const mst = graph.kruscal();

    console.log('\nMinimal Spanning Tree (Kruscal):');

    mst.forEach((edge) => {
      console.log(`${edge.from} -> ${edge.to} (weight: ${edge.weight})`);
    });
  } catch (e) {
    console.error(e.message);
  }
};

main();
