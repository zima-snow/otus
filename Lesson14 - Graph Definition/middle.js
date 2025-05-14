// Перечень ребер
const edgeList = [
  ['u1', 'v1'],
  ['u1', 'v2'],
  ['u2', 'v2'],
  ['u2', 'v3'],
  ['u3', 'v4']
];

// Векторы смежности
const adjacencyVectors = [
  ['v1', 'v2'],  // u1
  ['v2', 'v3'],  // u2
  ['v4', 0],     // u3
  ['u1', 0],     // v1
  ['u1', 'u2'],  // v2
  ['u2', 0],     // v3
  ['u3', 0]      // v4
];

// Массивы смежности
const adjacencyArrays = [
  ['v1', 'v2'],  // u1
  ['v2', 'v3'],  // u2
  ['v4'],        // u3
  ['u1'],        // v1
  ['u1', 'u2'],  // v2
  ['u2'],        // v3
  ['u3']         // v4
];

// Списки смежности
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1);
  }
}

const graph = new Graph();

['u1', 'u2', 'u3', 'v1', 'v2', 'v3', 'v4'].forEach(v => graph.addVertex(v));

graph.addEdge('u1', 'v1');
graph.addEdge('u1', 'v2');
graph.addEdge('u2', 'v2');
graph.addEdge('u2', 'v3');
graph.addEdge('u3', 'v4');
