import Graph from './Graph.js';

const main = () => {
  // Create graph with 6 vertices (0, 1, 2, 3, 4, 5)
  // Smax = 2 (max count of adjacency vertices)
  const adjacencyVector = [
    [1, 3], // 0 → 1, 0 → 3
    [5, null], // 1 → 5
    [1, null], // 2 → 1
    [5, null], // 3 → 5
    [null, null], // 4
    [4, null], // 5 → 4
  ];

  const graph = new Graph(adjacencyVector, adjacencyVector.length);

  graph.print();

  try {
    const levels = graph.demukron();

    console.log('Topological sorting levels (Demucron):');

    levels.forEach((levelVertices, index) => {
      console.log(`Level ${index}: [${levelVertices.join(', ')}]`);
    });
  } catch (e) {
    console.error(e.message);
  }
};

main();
